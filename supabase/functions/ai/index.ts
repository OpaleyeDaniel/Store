import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Secure CORS configuration - only allow requests from trusted origins
const allowedOrigins = [
  /^https:\/\/.*\.lovableproject\.com$/,  // Lovable preview domains
  /^https:\/\/.*\.lovable\.app$/,          // Lovable deployed domains
  /^http:\/\/localhost:\d+$/,              // Local development
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const isAllowed = origin && allowedOrigins.some(pattern => pattern.test(origin));
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : "https://lovable.app",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, generateImage } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get the LOVABLE_API_KEY from environment (automatically provided)
    const apiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!apiKey) {
      console.error("LOVABLE_API_KEY not found in environment, please enable the AI gateway");
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If image generation is requested
    if (generateImage) {
      try {
        // For image generation, we need to use the OpenAI image model through the gateway
        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-5",
            messages: [
              {
                role: "system",
                content: "You are an image generation assistant. When asked to generate images, provide a detailed, professional description that could be used to create high-quality activewear photography.",
              },
              {
                role: "user",
                content: `Generate a professional activewear photograph: ${message}. Make it look like premium brand photography with excellent lighting and composition.`,
              },
            ],
            temperature: 0.7,
            max_completion_tokens: 500,
          }),
        });

        if (!response.ok) {
          console.error("AI Gateway error:", await response.text());
          return new Response(JSON.stringify({ error: "Failed to generate image description" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const data = await response.json();
        const imageDescription = data.choices?.[0]?.message?.content;

        if (!imageDescription) {
          console.error("No image description from AI", data);
          return new Response(JSON.stringify({ error: "No image description generated" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // For now, return the description - in a real implementation, 
        // this would be passed to an actual image generation service
        return new Response(JSON.stringify({ 
          imageDescription,
          // Placeholder image URL for testing
          imageUrl: `https://picsum.photos/1024/1024?random=${Math.random()}`
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Image generation error:", error);
        return new Response(JSON.stringify({ error: "Image generation failed" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Regular text generation
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a creative image generation assistant that creates detailed prompts for athletic wear and fitness imagery. Focus on clean, modern, premium aesthetic with high-quality product photography style.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error("AI Gateway error:", await response.text());
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      console.error("No response from AI", data);
      return new Response(JSON.stringify({ error: "No response from AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ response: aiMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in AI call:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
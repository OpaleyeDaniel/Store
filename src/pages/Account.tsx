import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Account = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 pt-24 pb-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">My Account</h1>
          <p className="text-muted-foreground">Account page coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
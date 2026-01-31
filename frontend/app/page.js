import { Button } from "@/components/ui/button";
import { PricingTable } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Welcome to RecipeAI</h1>
        <p className="mb-6">
          Your AI-powered recipe platform. Discover, create, and manage your recipes with ease.
        </p>
        <div className="space-y-4">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Pricing Plans</h2>
            <PricingTable checkoutProps={{
              appearance: {
                elements:{
                  drawerRoot:{zIndex: 2000}
                }
              }
            }}/>
          </div>
        </div>
      </main>
    </div>
  );
}

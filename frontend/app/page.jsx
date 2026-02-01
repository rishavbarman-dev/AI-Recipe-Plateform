import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Clock, Flame, Star, Users, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SITE_STATS, FEATURES, HOW_IT_WORKS_STEPS } from "@/lib/data";
import PricingSection from "@/components/PricingSection";

export default async function Home() {
  const { has } = await auth();
  const subscriptionTier = has({plan: "pro"}) ? "pro" : "free";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
        {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <Badge
                variant="outline"
                className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-6 uppercase tracking-wide"
              >
                <Flame className="mr-1" />
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-[0.9] tracking-tight">
                Turn your{" "}
                <span className="italic underline decoration-4 decoration-orange-600">
                  leftovers
                </span>{" "}
                into <br />
                masterpieces.
              </h1>

              <p className="text-xl md:text-2xl text-stone-600 mb-10 max-w-lg mx-auto md:mx-0 font-light">
                Snap a photo of your fridge. We&apos;ll tell you what to cook.
                Save money, reduce waste, and eat better tonight.
              </p>

              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="primary"
                  className="px-8 py-6 text-md text-white bg-amber-500 hover:bg-amber-600 cursor-pointer"
                >
                  Start Cooking Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <p className="mt-6 text-sm text-stone-500">
                <span className="font-bold text-stone-900">10k+ cooks</span>{" "}
                joined last month
              </p>
            </div>

            {/* Hero Image */}
            <Card className="relative aspect-square md:aspect-4/5 bg-stone-200 overflow-hidden py-0">
              <Image
                src="/pasta-dish.png"
                alt="Delicious pasta dish"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />

              {/* Floating Card */}
              <Card className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm border-2 border-stone-900 py-0">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">
                        Rustic Tomato Basil Pasta
                      </h3>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-orange-500 text-orange-500"
                          />
                        ))}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-2 border-green-700 bg-green-50 text-green-700 font-bold"
                    >
                      98% MATCH
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 25 mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> 2 servings
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Card>




          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-stone-200 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SITE_STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.val}</p>
                <p className="text-sm text-stone-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-6 uppercase tracking-wide"
            >
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to cook smarter
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Powerful tools that transform your kitchen experience. Start free, upgrade when you&apos;re ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <Card key={i} className="border-2 border-stone-200 hover:border-orange-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <feature.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-stone-600 mb-3">{feature.description}</p>
                      <Badge variant="secondary" className="bg-stone-100 text-stone-600 font-medium">
                        {feature.limit}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-2 border-stone-600 text-stone-300 bg-stone-800 text-sm font-bold mb-4"
            >
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              From fridge to feast in 3 steps
            </h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto">
              No planning required. Just open your fridge and let AI do the thinking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-orange-500 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-stone-400">{item.desc}</p>
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-4 w-8 h-8 text-stone-700" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="px-8 py-6 text-md bg-white text-stone-900 hover:bg-stone-100 cursor-pointer"
              >
                Try It Now — It&apos;s Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-6 uppercase tracking-wide"
            >
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Start cooking for free. Upgrade to Pro when you want unlimited access.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
          <PricingSection subscriptionTier={subscriptionTier} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-linear-to-br from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your kitchen?
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Join 10,000+ home cooks who are saving money, reducing waste, and eating better with Served.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="px-8 py-6 text-md bg-white text-orange-600 hover:bg-stone-100 font-bold cursor-pointer"
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-orange-100 text-sm">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> 10 free scans/month
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Cancel anytime
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

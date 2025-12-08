import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 md:mb-12">
        About Nup Nup Foods
      </h1>

      <div className="mb-8 md:mb-12">
        <Image
          src="/images/website/nupnup/coconut-blossom.jpg"
          alt="Coconut blossom"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p>
          Nup Nup Foods is a Thailand-based food company focused on developing
          simple, high-quality products built on local ingredients and modern
          production standards. Our goal is straightforward: create dependable
          everyday staples that are honest, well-made, and easy to use.
        </p>

        <p>
          We begin with ingredients that Thailand does exceptionally
          well—coconut, palm blossom sugar, herbs, teas, and natural
          sweeteners. Rather than chasing novelty, we focus on refining
          traditional flavors and presenting them in formats that work for
          today's kitchens, cafés, and consumers.
        </p>

        <p>
          Our first product line, <strong className="text-primary">Thai Nectar</strong>, is a natural syrup
          series that highlights Thailand's coconut and blossom sugar profile.
          The aim is practical: a clean, versatile sweetener that fits home
          cooking, cafés, and product developers who want consistency without
          artificial additives.
        </p>

        <div className="my-8">
          <Image
            src="/images/website/nupnup/pancakes.jpg"
            alt="Pancakes with Thai Nectar"
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <p>
          Nup Nup Foods operates with a disciplined approach to sourcing,
          manufacturing, and scale. We work with established Thai producers and
          OEM partners, select production methods appropriate for long-term
          reliability, and maintain a clear path for future product expansion.
        </p>

        <p>
          We are building the company methodically—starting with categories where
          Thailand already leads globally, and expanding only when the product
          quality and operational readiness justify it. Over time, Nup Nup Foods
          will extend into additional natural syrups, beverage bases, and
          specialty pantry items that follow the same principle: uncomplicated
          products made properly.
        </p>

        <p>
          Nup Nup Foods is part of a broader effort to show that Thai
          ingredients, when handled with care and modern standards, can stand
          alongside the world's best. Our work is grounded in craft, not hype,
          and built to endure.
        </p>
      </div>
    </div>
  );
}


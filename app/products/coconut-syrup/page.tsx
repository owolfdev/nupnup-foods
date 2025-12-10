import Image from "next/image";

export default function CoconutSyrup() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
        Thai Nectar — Coconut Syrup
      </h1>
      <p className="text-lg text-gray-600 mb-8 md:mb-12 italic">
        A natural sweetener made from Thailand&apos;s coconut blossom.
      </p>

      <div className="mb-8 md:mb-12">
        <Image
          src="/images/website/nupnup/pancakes.jpg"
          alt="Pancakes with Thai Nectar"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Description
          </h2>
          <p>
            Thai Nectar Coconut Syrup is a refined, single-ingredient syrup made
            from the sap of Thai coconut blossoms. It delivers a warm, natural
            sweetness with subtle caramel notes and a clean finish. The flavor
            is smooth, balanced, and versatile, making it suitable for everyday
            use in kitchens, cafés, and food products.
          </p>
          <p>
            Unlike refined sugar, coconut syrup retains its natural minerals and
            depth of flavor. It dissolves easily, mixes well into hot or cold
            drinks, and adds gentle richness without overpowering other
            ingredients.
          </p>
          <div className="my-8">
            <Image
              src="/images/website/nupnup/coconut-syrup-label.jpg"
              alt="Thai Nectar Coconut Syrup Label"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            What It&apos;s Made From
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>100% coconut blossom sap</li>
            <li>Collected from mature Thai coconut palms</li>
            <li>Heated gently to concentrate into syrup</li>
            <li>No additives, no artificial flavoring, no preservatives</li>
          </ul>
          <div className="my-8">
            <Image
              src="/images/website/nupnup/coconut-blossom-2.jpg"
              alt="Coconut blossom"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Flavor Profile
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Mild caramel</li>
            <li>Light floral undertone</li>
            <li>Clean sweetness</li>
            <li>Slightly thicker than maple syrup, but pours smoothly</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            How to Use It
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Home Use
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Pancakes, waffles, and French toast</li>
                <li>Coffee, tea, and matcha</li>
                <li>Smoothies and protein shakes</li>
                <li>Yogurt, oatmeal, and fruit bowls</li>
                <li>
                  Baking as a 1:1 sugar alternative (adjust liquid slightly)
                </li>
              </ul>
              <div className="my-8">
                <Image
                  src="/images/website/nupnup/breakfast.jpg"
                  alt="Breakfast with Thai Nectar"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Café & Foodservice
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Signature drinks</li>
                <li>Dessert finishing</li>
                <li>Ice cream and gelato</li>
                <li>Cocktail syrups</li>
                <li>Marinades and glazes</li>
              </ul>
              <div className="my-8">
                <Image
                  src="/images/website/nupnup/culinary-collage.jpg"
                  alt="Culinary uses of Thai Nectar"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Why Choose Coconut Syrup
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Naturally low-glycemic relative to refined sugar</li>
            <li>Plant-based and minimally processed</li>
            <li>Sustainably sourced from Thai coconut farms</li>
            <li>
              Consistent flavor suitable for both home and commercial formulas
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Ingredients
          </h2>
          <p>100% Coconut Blossom Syrup.</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Allergen Information
          </h2>
          <p>Contains no common allergens. Gluten-free, dairy-free, vegan.</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Storage
          </h2>
          <p>
            Store in a cool, dry place. Refrigeration not required after
            opening, but recommended for freshness. Crystallization may occur
            naturally; warm gently to re-liquify.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Available Sizes
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>250 ml</li>
            <li>500 ml</li>
            <li>1 L foodservice bottle</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Suitable For
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Health-conscious consumers</li>
            <li>Home cooks and bakers</li>
            <li>Cafés, restaurants, and beverage shops</li>
            <li>Product developers needing a clean-label sweetener</li>
          </ul>
        </section>

        <section className="border-t pt-8 mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Brand Story
          </h2>
          <div className="space-y-4">
            <p>
              Thai Nectar began with a simple idea: bring the pure sweetness of
              Thailand&apos;s coconut blossom to breakfast tables around the
              world.
            </p>
            <p>
              For generations, Thai artisans have crafted syrup from the nectar
              of coconut flowers—slowly warming the sap until it becomes a
              caramel-like syrup with a naturally low glycemic index and a depth
              of flavor that ordinary sugar cannot match. This tradition is
              quiet, humble, and rarely seen outside Southeast Asia.
            </p>
            <p>
              Thai Nectar was created to share this tradition with the world.
            </p>
            <p>
              Every bottle begins in small coconut groves across Thailand, where
              skilled harvesters climb the trees at dawn to collect fresh
              blossom nectar. The syrup is then gently cooked to preserve its
              natural aroma—notes of caramel, toasted coconut, and tropical
              warmth. Nothing artificial. No corn syrup. No shortcuts.
            </p>
            <p className="font-semibold">
              Just the authentic taste of Thailand.
            </p>
            <p>
              Thai Nectar is made for: pancakes & waffles, iced coffee & Thai
              tea, desserts & baking, chefs, cafés, and home kitchens.
            </p>
            <p>
              We believe sweetness should be simple, natural, and rooted in
              culture—not manufactured in a refinery.
            </p>
            <p>
              With Thai Nectar, we&apos;re building more than a syrup brand.
              We&apos;re creating a bridge between Thai tradition and global
              kitchens—one delicious pour at a time.
            </p>
            <p className="font-semibold text-gray-900">
              Thai Nectar. Authentic. Natural. Crafted in Thailand.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

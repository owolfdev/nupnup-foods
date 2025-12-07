import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full min-h-0 py-8">
      <Image
        src="/logo/logo.jpg"
        alt="Nup Nup Logo"
        width={600}
        height={400}
        priority
        className="max-w-full h-auto"
      />
    </div>
  );
}

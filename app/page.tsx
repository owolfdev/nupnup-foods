import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image
        src="/logo/logo.jpg"
        alt="Nup Nup Logo"
        width={600}
        height={400}
        priority
        className="max-w-full h-auto -mt-32"
      />
    </div>
  );
}

import Image from "next/image";

const getAnimeData = async () => {
    const res = fetch("");
};

export default function Home() {
    return (
        <>
            <header className="text-white text-center flex justify-center items-center">
                <Image
                    src="/logo.png"
                    alt="Jujutsu Kaisen Logo"
                    width={400}
                    height={340}
                />
            </header>

            <main className="grid grid-cols-2">
              <div>
                1
              </div>
              
              <div>
                2
              </div>
            </main>
        </>
    );
}

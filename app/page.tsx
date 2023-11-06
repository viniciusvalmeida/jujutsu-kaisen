import CharacterInfo from "@/components/CharacterInfo";
import CharacterCard from "@/components/CharacterCard";
import Image from "next/image";

type HomeProps = {
	searchParams: {
		mal_id: string;
	};
};

export type Character = {
	character: {
		mal_id: number;
		name: string;
		images: {
			webp: {
				image_url: string;
				small_image_url: string;
			};
		};
	};
};

type FethResponse = {
	data: Character[];
};

const getAnimeData = async (): Promise<FethResponse | void> => {
	try {
		const res = await fetch(
			"https://api.jikan.moe/v4/anime/40748/characters"
		);

		if (!res.ok) return;

		return res.json();
	} catch (err) {
		console.error(err);
	}
};

export default async function Home({ searchParams }: HomeProps) {
	const { data } = (await getAnimeData()) as FethResponse;
	const characterId = +searchParams.mal_id || 164471;

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

			<main className="grid grid-cols-[1fr_3fr] md:grid-cols-2 gap-4 px-4 xl:px-0">
				<div className="bg-slate-400/60 rounded-xl p-4 shadow-2xl shadow-slate-500 backdrop-blur-sm">
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{data.map((char) => (
							<CharacterCard
								key={char.character.mal_id}
								characterId={characterId}
								char={char}
							/>
						))}
					</ul>
				</div>

				<CharacterInfo mal_id={characterId} />
			</main>
		</>
	);
}

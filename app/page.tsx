import Image from "next/image";

type Character = {
	character: {
		mal_id: number;
		name: string;
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

		return res.json();
	} catch (err) {
		console.error(err);
	}
};

export default async function Home() {
	const { data } = (await getAnimeData()) as FethResponse;

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
				<div className="bg-red-400/50">
					<ul>
						{data.map((char) => (
							<li key={char.character.mal_id}>
								{char.character.name}
							</li>
						))}
					</ul>
				</div>

				<div className="bg-emerald-400/50">2</div>
			</main>
		</>
	);
}

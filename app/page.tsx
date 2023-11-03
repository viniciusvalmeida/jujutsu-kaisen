import { log } from "console";
import Image from "next/image";
import Link from "next/link";

type HomeProps = {
	searchParams: {
		mal_id: string;
	};
};

type Character = {
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

type CharacterFull = {
	data: {
		mal_id: number;
		name: string;
		about: string;
		images: {
			webp: {
				image_url: string;
			};
		};
	};
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

const getCharacterInfo = async (
	mal_id: number
): Promise<CharacterFull | void> => {
	try {
		const res = await fetch(
			`https://api.jikan.moe/v4/characters/${mal_id}/full`
		);

		if (!res.ok) return;

		return res.json();
	} catch (err) {
		console.error(err);
	}
};

export default async function Home({ searchParams }: HomeProps) {
	const { data } = (await getAnimeData()) as FethResponse;
	const character = (await getCharacterInfo(
		+searchParams.mal_id || 164471
	)) as CharacterFull;

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

			<main className="grid grid-cols-2 gap-4">
				<div className="bg-slate-400/60 rounded-xl p-4 shadow-2xl shadow-slate-500">
					<ul className="grid grid-cols-3 gap-4">
						{data.splice(0, 27).map((char) => (
							<li
								key={char.character.mal_id}
								className="cursor-pointer"
							>
								<Link
									href={`/?mal_id=${char.character.mal_id}`}
									className="flex items-center gap-3"
								>
									<Image
										src={
											char.character.images.webp.image_url
										}
										alt="Character Image"
										width={50}
										height={100}
									/>
									{char.character.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="bg-slate-400/60 rounded-xl p-4 flex flex-col items-center space-y-4 shadow-2xl shadow-slate-500">
					<Image
						className="rounded-lg"
						src={character.data.images.webp.image_url}
						alt="Character Image"
						width={250}
						height={420}
					/>

					<h2 className="text-2xl font-bold">
						{character.data.name}
					</h2>
					<p>{character.data.about}</p>
				</div>
			</main>
		</>
	);
}

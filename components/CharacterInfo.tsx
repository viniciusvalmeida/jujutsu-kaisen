import Image from "next/image";

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

export default async function CharacterInfo({ mal_id }: { mal_id: number }) {
	const character = (await getCharacterInfo(mal_id)) as CharacterFull;
	return (
		<div className="bg-slate-400/60 max-h-[78vh] overflow-scroll rounded-xl p-4 flex flex-col items-center space-y-4 shadow-2xl shadow-slate-500 backdrop-blur-sm">
			<Image
				className="rounded-lg w-24 md:w-48 lg:w-72"
				src={character.data.images.webp.image_url}
				alt="Character Image"
				width={250}
				height={420}
			/>

			<h2 className="text-2xl font-bold">{character.data.name}</h2>
			<p>{character.data.about}</p>
		</div>
	);
}

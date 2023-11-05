import { Character } from "@/app/page";
import Link from "next/link";
import Image from "next/image";

export default function CharacterList({
	char,
	characterId,
}: {
	char: Character;
	characterId: number;
}) {
	return (
		<li
			className={`cursor-pointer rounded-xl p-2 ${
				char.character.mal_id === characterId ? "bg-sky-600/50" : ""
			} hover:bg-slate-300`}
		>
			<Link
				href={`/?mal_id=${char.character.mal_id}`}
				className="flex flex-col text-center items-center md:flex-row md:text-start gap-3"
			>
				<Image
					className="rounded-xl"
					src={char.character.images.webp.image_url}
					alt="Character Image"
					width={50}
					height={100}
				/>
				{char.character.name}
			</Link>
		</li>
	);
}

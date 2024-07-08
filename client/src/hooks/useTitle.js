import { useEffect } from "react";

const useTitle = (title) => {
	useEffect(() => {
		document.title = `Treker - ${title}`;
	}, [title]);
};

export default useTitle;

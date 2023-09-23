import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { useNotesApi } from "../../../core/api/Notes";
import { useAuth } from "../../../core/hooks/useAuth";
import { queryKeys } from "../../../core/configs/QueryClient";
import { CACHE_LIFE_TIME } from "../../../core/constants/queries";

import { RenderNotes } from "../../../components/smart/RenderNotes";
import { Controls } from "../../../components/smart/Controls";
import { Spinner } from "../../../components/simple/Spinner";

const { allNotes } = useNotesApi;
const { ALL_NOTES } = queryKeys;
const cx = classNames.bind(styles);

const ShowNotes = () => {
    const { user } = useAuth();

    useEffect(() => {
        document.title = "Noteo - заметки";
    }, []);

    const { data, isLoading } = useQuery(
        [ALL_NOTES],
        () => allNotes(user?.id.toString() || "0"),
        { refetchInterval: CACHE_LIFE_TIME }
    );

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className={cx("board")}>
            <Controls />
            <RenderNotes data={data?.data || []} />
        </main>
    );
};

export default ShowNotes;

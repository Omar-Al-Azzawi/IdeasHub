"use client";

import React, { Suspense } from "react";
import IdeaCard from "@/components/IdeaCard";
import CardContainer from "@/components/CardContainer";
import { Idea } from "@/types/Idea";

type IdeasListProps = {
    user: any
    ideas: Idea[];
};

const IdeasList: React.FC<IdeasListProps> = ({ user, ideas }) => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <CardContainer>
                {ideas.map((idea: Idea) => (
                    <IdeaCard
                        key={idea.id}
                        user={user}
                        idea={idea}
                    />
                ))}
            </CardContainer>
        </Suspense>
    );
};

export default IdeasList;

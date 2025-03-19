import React, { useState, useEffect, useContext } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LandingContext } from "../contexts/LandingContext";
import "../assets/css/play.css";

const renderSvg = (languageProperties) => (
	<svg
		className="orderQuestionIcon"
		width="8"
		height="13"
		viewBox="0 0 8 13"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		data-lang={languageProperties.lang}
	>
		<circle cx="1.29961" cy="1.3" r="1.3" transform="rotate(90 1.29961 1.3)" fill="white" />
		<circle cx="1.29961" cy="6.50001" r="1.3" transform="rotate(90 1.29961 6.50001)" fill="white" />
		<circle cx="1.29961" cy="11.7" r="1.3" transform="rotate(90 1.29961 11.7)" fill="white" />
		<circle cx="6.4998" cy="1.3" r="1.3" transform="rotate(90 6.4998 1.3)" fill="white" />
		<circle cx="6.4998" cy="6.50001" r="1.3" transform="rotate(90 6.4998 6.50001)" fill="white" />
		<circle cx="6.4998" cy="11.7" r="1.3" transform="rotate(90 6.4998 11.7)" fill="white" />
	</svg>
);

const SortableItem = ({ value }) => {
	const { languageProperties } = useContext(LandingContext);
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: value.public_id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div className="col-md-12 text-center mb-2">
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				className="OrderanswerContainer cursor-grab position-relative d-flex align-items-center font-regular"
				data-public-id={value.public_id}
			>
				{renderSvg(languageProperties)}
				<span className="pl-4" data-public-id={value.public_id}>
          {value.description}
        </span>
			</div>
		</div>
	);
};

const getOrderedAnswers = (answers) => {
	const answer_ids = answers.map((answer) => answer.public_id);
	return answer_ids.join(",");
};

const SortableComponent = ({ answers, setOrderedQuest }) => {
	const [items, setItems] = useState(answers);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	useEffect(() => {
		setOrderedQuest(getOrderedAnswers(items));
	}, [items, setOrderedQuest]);

	useEffect(() => {
		if (answers !== items) {
			setItems(answers);
		}
	}, [answers]);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex(item => item.public_id === active.id);
				const newIndex = items.findIndex(item => item.public_id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={items.map(item => item.public_id)}
				strategy={verticalListSortingStrategy}
			>
				<div className="answerListingContainer">
					{items.map((value) => (
						<SortableItem key={value.public_id} value={value} />
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
};

export default SortableComponent;
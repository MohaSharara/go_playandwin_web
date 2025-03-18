import React, { Component, useContext } from "react";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
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

const renderDiv = (value, index) => {
	const { languageProperties } = useContext(LandingContext);
	return (
		<div key={index} className="col-md-12 text-center mb-2">
			<div
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

const SortableItem = SortableElement(({ value, index }) => renderDiv(value, index));

const SortableList = SortableContainer(({ items }) => {
	return (
		<div className="answerListingContainer">
			{items.map((value, index) => (
				<SortableItem key={`item-${value.public_id}`} index={index} value={value} />
			))}
		</div>
	);
});

const getOrderedAnswers = (answers) => {
	const answer_ids = answers.map((answer) => answer.public_id);
	return answer_ids.join(",");
};

class SortableComponent extends Component {
	state = {
		items: this.props.answers,
	};

	componentDidMount() {
		this.props.setOrderedQuest(getOrderedAnswers(this.state.items));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.answers !== this.props.answers) {
			this.setState({ items: this.props.answers });
		}
		if (prevState.items !== this.state.items) {
			this.props.setOrderedQuest(getOrderedAnswers(this.state.items));
		}
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ items }) => ({
			items: arrayMove(items, oldIndex, newIndex),
		}));
	};

	render() {
		return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
	}
}

export default SortableComponent;

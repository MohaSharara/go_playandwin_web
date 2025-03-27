import React, {Fragment, use, useState} from 'react';
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";

const Faq = (props) => {
    const [openAccordion, setOpenAccordion] = useState(null);
    const {currentOperatorCode, languageProperties, faqsContent} = use(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode)

    const toggleAccordion = (i) => {
        setOpenAccordion(openAccordion === i ? null : i);
    };

    const isAccordionOpen = (i) => {
        return openAccordion === i;
    };

    const renderOneFaq = (faq, i, length) => {
        const isOpen = isAccordionOpen(i);
        const isLastItem = i === length - 1;

        return (
            <div
                className={`accordion-item ${isLastItem ? "accordion-item-hidden" : ""}`}
                key={i}
            >
                <h2 className="accordion-header" id={`flush-heading${i}`}>
                    <button
                        className={`accordion-button faq-styling font-bold px-0 text-start ${isOpen ? "" : "collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${i}`}
                        aria-expanded={isOpen ? "true" : "false"}
                        aria-controls={`flush-collapse${i}`}
                        onClick={() => toggleAccordion(i)}
                    >
                        {i + 1}. {faq.q}
                    </button>
                </h2>
                <div
                    id={`flush-collapse${i}`}
                    className={`accordion-collapse faq-details collapse ${isOpen ? "show" : ""}`}
                    aria-labelledby={`flush-heading${i}`}
                    data-bs-parent="#FAQ"
                >
                    <div
                        className="accordion-body card-body text-start faqDetails p-0 px-1 pb-3 px-0"
                        dangerouslySetInnerHTML={{__html: Tools.sanitizeHTML(faq.a)}}
                    ></div>
                </div>
            </div>
        );
    };

    return (
        <div id="faq" className="col-12 faqStatic pt-4 pb-4 p-md-5" data-lang={languageProperties.lang} dir={languageProperties.dir}>
            <div className="container px-5">
                <div className="mt-2">
                    <div className="col-12 faq-title sub-color font-bold text-start">{translation_obj.FAQ}</div>
                    <br />
                    <div className="mx-auto col-12 p-0 mt-3">
                        <div className="accordion accordion-flush" id="FAQ">
                            {faqsContent && faqsContent.length > 0 ?
                                <Fragment>{faqsContent.map((faq, i) => renderOneFaq(faq, i, faqsContent.length))}</Fragment>
                                :
                                <Fragment>{translation_obj.FAQ_CONTENT.map((faq, i) => renderOneFaq(faq, i, translation_obj.FAQ_CONTENT.length))}</Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;

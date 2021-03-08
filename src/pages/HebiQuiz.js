import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Hebis } from "../images/ondanya";

import "./HebiQuiz.scss";
import { randomNumber } from "../utils";

const RewardData = [
  {
    title: "Warrior",
    textParagraphs: [
      "Probably the one that you've met first.",
      "High in spirit, ready for a fight to protect.",
    ],
    image: Hebis.WAR,
  },
  {
    title: "Ninja",
    textParagraphs: ["What's so suspicious about a bird?"],
    image: Hebis.NIN,
  },
  {
    title: "Monk",
    textParagraphs: [
      "A Miqo of her own caliber.",
      "Her main weapons are a set of kettles.",
      "She is usually followed by a strange cactuar cutting that she takes care of.",
    ],
    image: Hebis.MNK,
  },
  {
    title: "Samurai",
    textParagraphs: [
      "Her outfit doesn't come off since the day she put it on.",
      "It's been a pain as she cant talk normally she uses an Allagan Tomestone to write her sentences.",
      "She can still speak but only when she fights as the suit is a stealth suit with most of the stealth features malfunctioning.",
    ],
    image: Hebis.SAM,
  },
  {
    title: "Bard",
    textParagraphs: ["HAT!"],
    image: Hebis.BRD,
  },
  {
    title: "Black Mage",
    textParagraphs: ["Not a black mage just a fancy thaumaturge."],
    image: Hebis.BLM,
  },
  {
    title: "Red Mage",
    textParagraphs: ["Hates the incompentence she has to deal with sometimes."],
    image: Hebis.RDM,
  },
  {
    title: "Summoner",
    textParagraphs: ["???"],
    image: Hebis.SMN,
  },
  {
    title: "White Mage",
    textParagraphs: [
      "Not a white mage just a conjurer.",
      "She is usually found around Gridania tending to the parents.",
    ],
    image: Hebis.WHM,
  },
  {
    title: "Scholar",
    textParagraphs: [
      "Not much is known about her but she does show herself around rare books.",
    ],
    image: Hebis.SCH,
  },
  {
    title: "Astrologian",
    textParagraphs: [
      "As if fate itself beth over backwards she managed to pick up the rare opportunity to learn the art of Astromancy.",
      "She likes to read the cards and tell people their fate at times.",
    ],
    image: Hebis.AST,
  },
  {
    title: "Youngest One",
    textParagraphs: [
      "The Youngest of the bunch, she fights in her own way as she is manipulating aether.",
      "Resides in the east as she spent a lot of time in Eureka trying to find herself as well as to deal with her aether sensitivity better.",
      "Quite the pacifist when it comes to conflict between people but fighting monsters is fine with her.",
    ],
    image: Hebis.EAST,
  },
  {
    title: "Carpenter",
    textParagraphs: ["WOOD!"],
    image: Hebis.CRP,
  },
  {
    title: "Blacksmith",
    textParagraphs: ["Cant leave a dull blade alone."],
    image: Hebis.BSM,
  },
  {
    title: "Armorer",
    textParagraphs: ["Likes the fire of the forge a bit too much."],
    image: Hebis.ARM,
  },
  {
    title: "Goldsmith",
    textParagraphs: ["The Lawyer and the Secretary of the bunch."],
    image: Hebis.GSM,
  },
  {
    title: "Leatherworker",
    textParagraphs: ["???"],
    image: Hebis.LTW,
  },
  {
    title: "Weaver",
    textParagraphs: ["The one on the high horse."],
    image: Hebis.WVR,
  },
  {
    title: "Alchemist",
    textParagraphs: [
      "Creates the weirdes of potions, and found in the strangest of places looking for ingredients.",
    ],
    image: Hebis.ALC,
  },
  {
    title: "Culinarian",
    textParagraphs: ["A good cook."],
    image: Hebis.CUL,
  },
];

/*
{
  question: "",
  flag: "",
  answers: [
    {
      answer: "No",
      points: 0,
      nextStep: 0,
    },
    {
      answer: "Yes",
      points: 0,
      nextStep: 0,
    },
  ],
},
*/

const EndStep = 9;
const BonusChoice = {
  question: "Player are you male of female?",
  flag: "gender",
  answers: [
    {
      answer: "Yes",
      points: 0,
      nextStep: 1,
    },
    {
      answer: "Nyaa",
      points: 0,
      nextStep: 10,
    },
    {
      answer: "No",
      points: 0,
      nextStep: 5,
    },
  ],
};

const QA = [
  {
    question: "Player, are you male of female?",
    flag: "gender",
    answers: [
      {
        answer: "Yes",
        points: 0,
        nextStep: 1,
      },
      {
        answer: "No",
        points: 0,
        nextStep: 5,
      },
    ],
  },
  {
    question: "How afraid are you of getting hurt, Player?",
    flag: "hurt",
    answers: [
      {
        answer: "Pain? What's pain?",
        points: 8,
        nextStep: 2,
      },
      {
        answer: "It'll buff out.",
        points: 6,
        nextStep: 3,
      },
      {
        answer: "Protect me, I'm a soft bean.",
        points: 0,
        nextStep: 4,
      },
    ],
  },
  {
    question: "Player describe yourself as?",
    flag: "description",
    answers: [
      {
        answer: "White",
        points: 0,
        nextStep: EndStep,
      },
      {
        answer: "Resourceful",
        points: 1,
        nextStep: EndStep,
      },
      {
        answer: "Lucky",
        points: 2,
        nextStep: EndStep,
      },
      {
        answer: "Kind",
        points: 3,
        nextStep: EndStep,
      },
    ],
  },
  {
    question: "Player, do you like pets?",
    flag: "pets",
    answers: [
      {
        answer: "Yes",
        points: 1,
        nextStep: EndStep,
      },
      {
        answer: "No",
        points: 0,
        nextStep: EndStep,
      },
    ],
  },
  {
    question: "In what way does Player deal with their problems?",
    flag: "instrument",
    answers: [
      {
        answer: "I deal with them",
        points: 0,
        nextStep: EndStep,
      },
      {
        answer: "I turn into a bird and run away",
        points: 1,
        nextStep: EndStep,
      },
      {
        answer: "Punch them",
        points: 2,
        nextStep: EndStep,
      },
      {
        answer: "Cut them down",
        points: 3,
        nextStep: EndStep,
      },
      {
        answer: "Sing them away",
        points: 4,
        nextStep: EndStep,
      },
      {
        answer: "Burn them to dust",
        points: 5,
        nextStep: EndStep,
      },
    ],
  },
  {
    question: "Are you sure?",
    flag: "confirmation",
    answers: [
      {
        answer: "Yes",
        points: 13,
        nextStep: 6,
      },
      {
        answer: "No",
        points: 0,
        nextStep: 1,
      },
    ],
  },
  {
    question: "How hard are you, Player?",
    flag: "hard",
    answers: [
      {
        answer: "Rock",
        points: 0,
        nextStep: 7,
      },
      {
        answer: "Not",
        points: 4,
        nextStep: 8,
      },
    ],
  },
  {
    question: "Player would like to be?",
    flag: "object",
    answers: [
      {
        answer: "Puproseful",
        points: 0,
        nextStep: EndStep,
      },
      {
        answer: "Worn",
        points: 1,
        nextStep: EndStep,
      },
      {
        answer: "Weilded",
        points: 2,
        nextStep: EndStep,
      },
      {
        answer: "Ornamental",
        points: 3,
        nextStep: EndStep,
      },
    ],
  },
  {
    question: "If Player was an animal, you'd like to be?",
    flag: "object",
    answers: [
      {
        answer: "Protectful",
        points: 0,
        nextStep: EndStep,
      },
      {
        answer: "Worn",
        points: 1,
        nextStep: EndStep,
      },
      {
        answer: "In a brew",
        points: 2,
        nextStep: EndStep,
      },
      {
        answer: "On a plate",
        points: 3,
        nextStep: EndStep,
      },
    ],
  },
  {
    question: "",
    flag: "",
    answers: [],
  },
  {
    question: "DID YOU REALLY THINK IT WOULD BE THIS EASY?",
    flag: "FINALBOSS",
    answers: [
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
      {
        answer: "Nya",
        points: 0,
        nextStep: 11,
      },
    ],
  },
  {
    question: "I SEE A SMARTASS?",
    flag: "FINALBOSS",
    answers: [
      {
        answer: "Nyaa",
        points: 0,
        nextStep: 12,
      },
    ],
  },
  {
    question: "LIKE I'D GIVE YOU A CHOCE, Player.",
    flag: "FINALBOSS",
    answers: [
      {
        answer: "Nyaaaaaaaaaaaaaaaaaa",
        points: 0,
        nextStep: 13,
      },
    ],
  },
  {
    question:
      "FORGET ABOUT THIS AND EVERYTHING ELSE, YOU WILL NEVER HAVE THEM. NEVER!!!!!",
    flag: "FINALBOSS",
    answers: [
      {
        answer:
          "Nyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        points: -1,
        nextStep: EndStep,
      },
    ],
  },
];

const timing = 1000;

const QuestionTemplate = ({
  qa,
  name,
  updateFlags,
  updatePoints,
  updateStep,
}) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, [qa]);

  return (
    <div style={{ opacity }} className="animatedArea">
      <h1>{qa.question.replace("Player", name)}</h1>
      <Formik
        initialValues={{ [qa.flag]: "" }}
        validate={(values) => values[qa.flag] > 0}
        onSubmit={(values, { setSubmitting }) => {
          const selectedItem = qa.answers[values[qa.flag]];
          updatePoints(selectedItem.points);
          setOpacity(0);
          setTimeout(() => {
            setSubmitting(false);
            updateStep(selectedItem.nextStep);
          }, timing);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            {qa.answers.map((choice, idx) => (
              <label>
                <Field
                  type="radio"
                  name={qa.flag}
                  value={idx}
                  checked={parseInt(values[qa.flag]) === idx}
                />
                {choice.answer}
              </label>
            ))}
            <button type="submit" className="button" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const getRand = () => randomNumber(0, RewardData.length);

const EndScreen = ({ name, points }) => {
  const [opacity, setOpacity] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(getRand());
  const [stopAnimation, setStopAnimation] = useState(false);

  useEffect(() => {
    setOpacity(1);
    setTimeout(() => {
      setStopAnimation(true);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      !stopAnimation && setAnimationFrame(getRand());
    }, 50);
  }, [animationFrame]);

  return (
    <div style={{ opacity, textAlign: "center" }} className="animatedArea">
      <h1>
        {name}, you were destined for <i>{RewardData[points].title} Hebi</i>
      </h1>
      <h3>
        But the Hebis are a chaotic system and not every destiny gets fulfilled
      </h3>
      <h3>This is why we picked the perfect one for you.</h3>
      <div>
        <img src={RewardData[animationFrame].image} />
        <h2>{RewardData[animationFrame].title}</h2>
      </div>
      {animationFrame === points && stopAnimation && (
        <h1>It seems that you've been lucky today</h1>
      )}
    </div>
  );
};

const HebiQuiz = () => {
  const [points, setPoints] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [step, setStep] = useState(-1);
  const [name, setName] = useState("");
  const [flags, setFlags] = useState({
    nameFailed: false,
  });

  useEffect(() => {
    setOpacity(1);
  }, []);

  const updatePoints = (pointValue) => {
    setPoints(points + pointValue);
  };

  const upadteFlags = (flag) => {
    setFlags({ ...flags, ...flag });
  };

  const updateStep = (nextStep) => {
    setStep(nextStep);
  };

  const render = () => {
    switch (step) {
      case -1:
        return (
          <Formik
            initialValues={{ playerName: "Hebi" }}
            validate={(values) => {
              const errors = {};

              if (!values.playerName) {
                errors.playerName = "You need a name.";
                setFlags({ ...flags, nameFailed: true });
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setName(values.playerName);
              setOpacity(0);
              setTimeout(() => setStep(0), timing);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ opacity }}>
                <label htmlFor="platerName">What's your name? :3</label>
                <Field name="playerName" placeholder="Nyaaa~" />
                <ErrorMessage name="playerName" component="div" />
                <button
                  type="submit"
                  className="button"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        );
      case EndStep:
        return <EndScreen name={name} points={points} />;
      default:
        return (
          <QuestionTemplate
            qa={QA[step]}
            name={name}
            updateFlags={upadteFlags}
            updatePoints={updatePoints}
            updateStep={updateStep}
          />
        );
    }
  };

  return (
    <div className="Quiz">
      <div className="quiz-wrap">
        <div className="quiz-form">
          <pre style={{ position: "absolute", top: "2%", right: "10%" }}>{`
          Points: ${points}
          Step: ${step}
          `}</pre>
          {render()}
        </div>
      </div>
    </div>
  );
};

export default HebiQuiz;

import { Routine } from "../types";

export const ROUTINE_VERSION = 9; // incremented to force refresh for Lower Body routine enhancements (SL RDL extra set + new bridge exercises)

export const DEFAULT_ROUTINES: Routine[] = [
  {
    id: "upper1",
    name: "Upper Body Day 1",
    subtitle: "Upper 1",
    focus: "Horizontal Push & Upper Back Thickness (Antagonist Paired Sets)",
    exercises: [
      {
        id: "u1_a1",
        name: "Banded Pushup",
        sets: 4,
        reps: "8-12",
        rest: "60 seconds (after A2)",
        defaultReps: 10,
        pairing: "A1",
        isSuperset: true,
        targetMuscle: "Chest, Triceps",
        setup: "Loop resistance band firmly across the mid-back (below the cervical spine to avoid neck compression). Secure handles/ends under palms on floor.",
        form: "Maintain a strict, locked plank from ears to heels. Lower under absolute control, then push back up forcefully.",
        cues: [
          "Loop band firmly across the mid-back (below the cervical spine to avoid neck compression).",
          "Keep elbows tucked to 45 degrees.",
          "Execute a 3-second eccentric (lowering) phase.",
          "At the top, actively push the floor away to protract the shoulder blades, engaging the serratus anterior for shoulder health."
        ]
      },
      {
        id: "u1_a2",
        name: "Parallel Bar Inverted Row",
        sets: 4,
        reps: "8-12",
        rest: "60 seconds (before A1)",
        defaultReps: 10,
        pairing: "A2",
        isSuperset: true,
        targetMuscle: "Upper Back, Back Thickness",
        setup: "Hang underneath sturdy parallel bars with a neutral grip (palms facing each other) and fully extended arms.",
        form: "Keep your feet anchored and body in a rigid reverse plank coordinate. Drive mid-chest up to meet the handles.",
        cues: [
          "Neutral grip on the bars, flare elbows out to 45–60 degrees.",
          "Drive the sternum up.",
          "Ensure the neck remains in a neutral, packed position (double chin); do not crane your neck forward to reach the bars."
        ]
      },
      {
        id: "u1_b1",
        name: "Band-Resisted Floor Press",
        sets: 3,
        reps: "8-12",
        rest: "60 seconds (after B2)",
        defaultReps: 10,
        pairing: "B1",
        isSuperset: true,
        targetMuscle: "Chest, Triceps Focus",
        setup: "Lie flat on your back, knees bent, feet flat on the floor. Loop resistance band behind your mid-back, holding ends firmly in each hand.",
        form: "Keep shoulders flat against floor, press straight up and lock out at the top.",
        cues: [
          "Lie flat, knees bent, feet flat on the floor to protect the lower back.",
          "Pin shoulder blades to the floor.",
          "Stop the descent the exact millisecond your triceps lightly graze the floor to prevent anterior shoulder gliding."
        ]
      },
      {
        id: "u1_b2",
        name: "Seated Feet-Banded Row (Neutral Grip)",
        sets: 3,
        reps: "8-12",
        rest: "60 seconds (before B1)",
        defaultReps: 10,
        pairing: "B2",
        isSuperset: true,
        targetMuscle: "Lats, Upper Back",
        setup: "Sit on the floor with your legs fully extended, a tiny bend in your knees. Loop the resistance band around the soles of your feet.",
        form: "Maintain a highly rigid spine and upright posture. Pull the ends toward your beltline.",
        cues: [
          "Sit with legs extended, slight bend in knees.",
          "Maintain a tall, rigid lumbar spine (no rounding).",
          "Keep elbows glued to ribs, pulling low toward the hips to isolate the lats."
        ]
      },
      {
        id: "u1_c1",
        name: "Banded Lateral Raises",
        sets: 4,
        reps: "12-15",
        rest: "45 seconds (after C2)",
        defaultReps: 12,
        pairing: "C1",
        isSuperset: true,
        targetMuscle: "Lateral Deltoids",
        setup: "Stand on the center of the band. Secure ends/handles with neutral wrist placement at your side.",
        form: "Raise your arms outward and slightly forward in a clean arc.",
        cues: [
          "Lift arms in the scapular plane (about 30 degrees forward of the body).",
          "Keep the wrists neutral and do not dump the thumbs downward.",
          "Warning: 'Pouring the pitcher' (dumping wrists) internally rotates the shoulder and causes impingement over time."
        ]
      },
      {
        id: "u1_c2",
        name: "Seated Feet-Banded Face Pulls",
        sets: 4,
        reps: "12-15",
        rest: "45 seconds (before C1)",
        defaultReps: 12,
        pairing: "C2",
        isSuperset: true,
        targetMuscle: "Rear Deltoids, Rotator Cuff",
        setup: "Sit on the floor with straight legs, loop resistance band securely around soles of feet, grip ends.",
        form: "Using an overhand grip, pull the band high towards your forehead while flaring elbows back.",
        cues: [
          "Overhand grip. Pull high toward the forehead.",
          "The hands must finish further back than the elbows.",
          "This successfully trains the external rotators of the rotator cuff to safeguard the shoulder capsule."
        ]
      },
      {
        id: "u1_d1",
        name: "Biceps Curls",
        sets: 3,
        reps: "10-15",
        rest: "45 seconds (after D2)",
        defaultReps: 12,
        pairing: "D1",
        isSuperset: true,
        targetMuscle: "Biceps Brachii",
        setup: "Stand tall on center of band, underhand grip on ends.",
        form: "Curl hands upward towards shoulders without swinging.",
        cues: [
          "Keep elbows entirely stationary in space.",
          "Avoid using lumbar momentum or torso shifting.",
          "Emphasize a controlled, slow eccentric squeeze."
        ]
      },
      {
        id: "u1_d2",
        name: "Banded Overhead Triceps Extensions",
        sets: 3,
        reps: "10-15",
        rest: "45 seconds (before D1)",
        defaultReps: 12,
        pairing: "D2",
        isSuperset: true,
        targetMuscle: "Triceps Long Head",
        setup: "Secure step on one end of the band with your back foot, bring other end overhead behind your neck.",
        form: "Keep elbows pointed forward and close to ears, press straight up overhead.",
        cues: [
          "Keep elbows entirely stationary in space.",
          "For the triceps extension, brace your core tightly so your ribs don't flare up, preventing lumbar extension."
        ]
      }
    ]
  },
  {
    id: "lower1",
    name: "Lower Body Day 1",
    subtitle: "Lower 1",
    focus: "Glute & Quad Focus (Pain-Free Isometrics & Stability)",
    exercises: [
      {
        id: "l1_a1",
        name: "Shallow Wall Sit with Adductor Co-Contraction",
        sets: 3,
        reps: "3 holds of 45s",
        rest: "60-90s",
        defaultReps: 45,
        targetMuscle: "Quads & Adductors",
        isHold: true,
        setup: "Lean back flat against a wall, positioning feet forward. Squeeze yoga block/pillow between knees.",
        form: "Descend into a shallow wall squat at exactly 45 degrees knee flexion.",
        cues: [
          "45° knee angle.",
          "Ensure your lower back is pressed flat into the wall.",
          "Squeeze a yoga block/pillow between the knees to recruit adductors and stabilize patellar tracking."
        ]
      },
      {
        id: "l1_b1",
        name: "Single-Leg Banded Romanian Deadlift (SL RDL)",
        sets: 4,
        reps: "10-15",
        rest: "90s",
        defaultReps: 10,
        targetMuscle: "Glutes & Hamstrings",
        setup: "Stand on one bare foot on center of band. Grip ends of band to configure baseline tension.",
        form: "Perform a pure hip hinge, pushing your hips backward and allowing a soft active knee bend.",
        cues: [
          "Pure hip hinge. Soft knee bend.",
          "Keep the hips completely square to the floor.",
          "Do not let the lifting-leg's hip rotate open toward the ceiling."
        ]
      },
      {
        id: "l1_c1",
        name: "Banded Frog Bridge (Soles Touching)",
        sets: 3,
        reps: "15-20",
        rest: "90s",
        defaultReps: 15,
        targetMuscle: "Glutes & Adductors",
        setup: "Lie on your back, bring the soles of your feet together, and pull your heels close to your pelvis. Position a resistance band above your knees.",
        form: "Drive the outer edges of your feet into the floor to bridge your hips up, actively pressing knees outward against the band.",
        cues: [
          "Keep the soles of your feet pressed firmly together throughout the entire movement.",
          "Focus on squeezing the glutes hard at the peak of the bridge and pushing knees outward."
        ]
      },
      {
        id: "l1_d1",
        name: "Side-Lying Hip Abductions",
        sets: 3,
        reps: "10-15",
        rest: "60s",
        defaultReps: 12,
        targetMuscle: "Gluteus Medius",
        setup: "Lie on side with legs extended straight. Support your neck on your bottom arm.",
        form: "Raise upper leg slowly in control, keeping tension on the lateral boundary of the hip.",
        cues: [
          "Position the working leg slightly behind the midline of your body (slight hip extension).",
          "This isolates the gluteus medius and prevents the tensor fasciae latae (TFL) from taking over."
        ]
      },
      {
        id: "l1_e1",
        name: "Calf Raises",
        sets: 4,
        reps: "10-15",
        rest: "60 seconds (after E2)",
        defaultReps: 12,
        pairing: "E1",
        isSuperset: true,
        targetMuscle: "Gastrocnemius & Soleus",
        setup: "Stand tallest on flat floor or step edge, maintaining steady balance.",
        form: "Rise directly on toes, pausing at peak and absolute bottom ranges.",
        cues: [
          "2-second pause at the absolute bottom stretch, 1-second squeeze at the top.",
          "Push through the big toe, not the outside of the foot."
        ]
      },
      {
        id: "l1_e2",
        name: "Tibialis Raises (Wall-Leaning)",
        sets: 3,
        reps: "15-25",
        rest: "60 seconds (before E1)",
        defaultReps: 15,
        pairing: "E2",
        isSuperset: true,
        targetMuscle: "Tibialis Anterior",
        setup: "Lean upper back flatly against a secure wall, placing your feet approximately 1.5 to 2 feet away from the wall.",
        form: "Actively pull toes up toward shin bones, keeping knees perfectly locked out.",
        cues: [
          "Keep the knees perfectly locked and straight to ensure the tibialis anterior does 100% of the work."
        ]
      },
      {
        id: "l1_f1",
        name: "Confined-Space Unilateral Suitcase Carry",
        sets: 3,
        reps: "30-45s",
        rest: "60s",
        defaultReps: 35,
        isHold: true,
        targetMuscle: "Anti-Lateral Core",
        setup: "Stand vertically, holding heavily loaded bookbag in one hand by side.",
        form: "Walk or hold body with zero side leaning.",
        cues: [
          "Resist lateral flexion.",
          "Your spine should remain perfectly vertical as if you aren't holding any weight at all."
        ]
      },
      {
        id: "l1_f2",
        name: "Swiss Ball Dead Bug",
        sets: 3,
        reps: "8-10 per side",
        rest: "60s",
        defaultReps: 8,
        targetMuscle: "Deep Core",
        setup: "Lie supine holding a Swiss ball locked between knees and hands.",
        form: "Extend opposite arm & leg while maintaining forceful pressure against ball.",
        cues: [
          "Exhale forcefully as the limbs extend.",
          "If the lower back loses contact with the floor for even a second, the set is over."
        ]
      }
    ]
  },
  {
    id: "upper2",
    name: "Upper Body Day 2",
    subtitle: "Upper 2",
    focus: "Vertical Push & Lat Bias (Hypertrophy Focus)",
    exercises: [
      {
        id: "u2_a1",
        name: "Banded Shoulder Press (Self-Anchored)",
        sets: 4,
        reps: "8-12",
        rest: "60 seconds (after A2)",
        defaultReps: 10,
        pairing: "A1",
        isSuperset: true,
        targetMuscle: "Anterior Deltoids",
        setup: "Stand secure on center of band, hands loaded at shoulder level.",
        form: "Squeeze core and glutes completely, drive band directly overhead.",
        cues: [
          "Brace the core.",
          "Actively squeeze your glutes during the press; this locks the pelvis in place and completely eliminates lumbar arching."
        ]
      },
      {
        id: "u2_a2",
        name: "2-in-1 Seated Lawnmower Rows ('Catch and Match')",
        sets: 4,
        reps: "8-12",
        rest: "60 seconds (before A1)",
        defaultReps: 10,
        pairing: "A2",
        isSuperset: true,
        targetMuscle: "Lats & Upper Back",
        setup: "Sit with legs straight. Cross the band over your feet in an 'X' shape so it absolutely cannot slide.",
        form: "Pull right elbow to hip with thoracic rotation, grab the band with left hand and match rotation.",
        cues: [
          "Cross the band over your feet in an 'X' shape so it cannot slide.",
          "Pull the right elbow to the hip, rotating the thoracic (upper) spine, not the lumbar (lower) spine.",
          "Grab the taut band with the left hand and pull to match."
        ]
      },
      {
        id: "u2_b1",
        name: "Decline Banded Close-Grip Pushup",
        sets: 3,
        reps: "10-12",
        rest: "60 seconds (after B2)",
        defaultReps: 10,
        pairing: "B1",
        isSuperset: true,
        targetMuscle: "Upper Chest & Triceps",
        setup: "Elevate your feet on a chair/sofa. Secure the resistance band across upper back under hands.",
        form: "Position hands shoulder-width or slightly narrower. Lower chest cleanly in a strict plank.",
        cues: [
          "Feet elevated. Hands shoulder-width.",
          "Do not let the hips sag; keep the body in a rigid plank to prevent compressive force on the lower back."
        ]
      },
      {
        id: "u2_b2",
        name: "Seated Feet-Banded Row (Neutral Grip)",
        sets: 3,
        reps: "8-12",
        rest: "60 seconds (before B1)",
        defaultReps: 10,
        pairing: "B2",
        isSuperset: true,
        targetMuscle: "Lats Focus",
        setup: "Sit upright, legs straight, loop band around feet and secure ends with neutral hand placement.",
        form: "Sit exceptionally tall, retract scapulae, pull low to hips.",
        cues: [
          "Elbows tight, pulling low to the hips.",
          "Allow the shoulder blades to stretch forward at the bottom, but pull them back down and together before the arms bend for the concentric pull."
        ]
      },
      {
        id: "u2_c1",
        name: "Banded Behind-the-Back Lateral Raises",
        sets: 3,
        reps: "12-15",
        rest: "45s",
        defaultReps: 12,
        targetMuscle: "Lateral Deltoids",
        setup: "Stand tall on band with opposite foot, cross band end behind your back to raise on active side.",
        form: "Raise your active arm outward and slightly forward in the scapular plane with absolute isolation.",
        cues: [
          "Stand tall.",
          "Do not use bodily momentum; if you have to swing your torso, use a lighter band."
        ]
      },
      {
        id: "u2_d1",
        name: "Biceps Mechanical Drop Set",
        sets: 3,
        reps: "Drop set to failure",
        rest: "120s",
        defaultReps: 10,
        targetMuscle: "Biceps & Brachialis",
        setup: "Stand on band, grasp ends. Curl with fully supinated wrists to failure, then immediately switch to hammer grip.",
        form: "Supinated grip curls straight to failure, then transition instantly to neutral hammer grip curls to failure.",
        cues: [
          "Supinated to failure, then hammer grip.",
          "Keep the wrists neutral/straight; curling the wrists inward shifts tension to the forearms and can cause medial epicondylitis."
        ]
      }
    ]
  },
  {
    id: "lower2",
    name: "Lower Body Day 2",
    subtitle: "Lower 2",
    focus: "Hamstring & Glute Focus (Knee-Flexion & Adduction Controls)",
    exercises: [
      {
        id: "l2_a1",
        name: "Shallow Wall Sit with Adductor Co-Contraction",
        sets: 3,
        reps: "3 holds of 45s",
        rest: "60-90s",
        defaultReps: 45,
        targetMuscle: "Quads & Adductors",
        isHold: true,
        setup: "Lean back flat against wall, squeeze yoga block/pillow between knees.",
        form: "Maintain vertical shins, hinge knees exactly to 45 degrees.",
        cues: [
          "45° knee angle.",
          "Ensure your lower back is pressed flat into the wall.",
          "Squeeze a yoga block/pillow between the knees to recruit adductors and stabilize patellar tracking."
        ]
      },
      {
        id: "l2_b1",
        name: "Single-Leg Banded RDL",
        sets: 4,
        reps: "10-15",
        rest: "90s",
        defaultReps: 10,
        targetMuscle: "Glutes & Hamstrings",
        setup: "Balance barefoot on center of band, hold ends, lift opposite leg.",
        form: "Hinge backward slowly with flat back.",
        cues: [
          "Pure hip hinge. Soft knee bend.",
          "Keep hips perfectly square to the floor.",
          "Do not let the lifting-leg's hip rotate open toward the ceiling."
        ]
      },
      {
        id: "l2_c1",
        name: "Supine Swiss Ball Hamstring Curl",
        sets: 3,
        reps: "10-15",
        rest: "90s",
        defaultReps: 12,
        targetMuscle: "Hamstrings",
        setup: "Lie on back on mat, calves/heels positioned high on top of Swiss ball.",
        form: "Bridge hips high, curl knees to roll ball toward glutes in a perfect bridge layout.",
        cues: [
          "The hips must remain elevated in a straight line with the knees and shoulders for the entire repetition.",
          "Dropping the hips shifts the load from the hamstrings to the lower back."
        ]
      },
      {
        id: "l2_d1",
        name: "Banded Hamstring Bridge (Feet Flat, Driving Outward)",
        sets: 3,
        reps: "12-15",
        rest: "60s",
        defaultReps: 12,
        targetMuscle: "Hamstrings & Gluteus Medius",
        setup: "Lie on your back, place feet flat on the floor slightly further forward than a standard glute bridge. Have a loop band positioned just above knees.",
        form: "Drive hips upward, simultaneously pushing your knees outward against the band to keep tension.",
        cues: [
          "Drive through the feet while consciously keeping the knees pushing wide against the band.",
          "Keep feet slightly further away to emphasize the hamstring and glute co-contraction."
        ]
      },
      {
        id: "l2_d2",
        name: "Calf Raises",
        sets: 4,
        reps: "10-15",
        rest: "60 seconds (after E2)",
        defaultReps: 12,
        pairing: "E1",
        isSuperset: true,
        targetMuscle: "Gastrocnemius & Soleus",
        setup: "Stand tallest on flat floor or step edge, maintaining steady balance.",
        form: "Rise directly on toes, pausing at peak and absolute bottom ranges.",
        cues: [
          "2-second pause at the absolute bottom stretch, 1-second squeeze at the top.",
          "Push through the big toe, not the outside of the foot."
        ]
      },
      {
        id: "l2_d3",
        name: "Tibialis Raises (Wall-Leaning)",
        sets: 3,
        reps: "15-25",
        rest: "60 seconds (before E1)",
        defaultReps: 15,
        pairing: "E2",
        isSuperset: true,
        targetMuscle: "Tibialis Anterior",
        setup: "Lean upper back flatly against a secure wall, placing your feet approximately 1.5 to 2 feet away from the wall.",
        form: "Actively pull toes up toward shin bones, keeping knees perfectly locked out.",
        cues: [
          "Keep the knees perfectly locked and straight to ensure the tibialis anterior does 100% of the work."
        ]
      },
      {
        id: "l2_e1",
        name: "Stir the Pot",
        sets: 3,
        reps: "8-10 slow circles",
        rest: "60s",
        defaultReps: 8,
        targetMuscle: "Deep Core",
        setup: "Forearms centered on Swiss ball in plank position.",
        form: "Execute pristine small circular orbits utilizing elbows with absolutely locked spine.",
        cues: [
          "Forearms on the ball, strict plank.",
          "Keep the circles small (micro-movements).",
          "Large, sweeping circles break spinal neutrality and stress the lumbar discs."
        ]
      },
      {
        id: "l2_e2",
        name: "Knee-Supported Copenhagen Plank",
        sets: 3,
        reps: "15-30s hold",
        rest: "60s",
        defaultReps: 20,
        isHold: true,
        targetMuscle: "Adductors Focus",
        setup: "Lie on your side perpendicular to chair/stool. Support top knee firmly on top platform.",
        form: "Lift hips and keep straight alignment, elevating bottom leg.",
        cues: [
          "Rest the inside of the top knee on a chair.",
          "Ensure your supporting elbow is stacked directly underneath your shoulder to avoid sheer stress on the rotator cuff."
        ]
      }
    ]
  }
];

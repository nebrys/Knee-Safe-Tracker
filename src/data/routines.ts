import { Routine } from "../types";

export const ROUTINE_VERSION = 5; // increment version to load biceps drop set sets updates

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
        targetMuscle: "Chest & Triceps",
        setup: "Place the resistance band across your upper back, looping it under your armpits, and secure both ends firmly under your palms on the floor.",
        form: "Maintain a straight-line plank from head to heels. Lower your chest until it hover just above the floor.",
        cues: [
          "Highly controlled 3-second eccentric phase on the way down.",
          "Keep elbows tucked at a 45-degree angle to protect your shoulders.",
          "Brace your core and squeeze your glutes to prevent hip sagging."
        ]
      },
      {
        id: "u1_a2",
        name: "Inverted Row (Neutral-Grip)",
        sets: 4,
        reps: "8-12",
        rest: "60 seconds (before A1)",
        defaultReps: 10,
        pairing: "A2",
        isSuperset: true,
        targetMuscle: "Upper Back & Rhomboids",
        setup: "Hang underneath a stable bar, secure table, or suspension straps. Use a neutral grip (palms facing each other) with arms fully extended.",
        form: "Keep your feet anchored on the floor and body rigid like a reverse plank. Pull your chest up to the handles/bar.",
        cues: [
          "Execute a powerful scapular squeeze at peak contraction to target the rhomboids and mid-trapezius.",
          "Lead the pull with your elbows, driving them down and back.",
          "Control the descent phase completely, maintaining tension."
        ]
      },
      {
        id: "u1_b1",
        name: "Standing Underhand Band Fly (Feet-Anchored)",
        sets: 3,
        reps: "10-12",
        rest: "60 seconds (after B2)",
        defaultReps: 10,
        pairing: "B1",
        isSuperset: true,
        targetMuscle: "Lower Chest Bias",
        setup: "Step on the center of the band with both feet in a stable stance. Grip the handles or ends with your palms facing forward/upward.",
        form: "With soft elbow bends, scoop your arms upward and inward toward your chest line in an arc.",
        cues: [
          "Focus on bringing your inner bicep/upper arm toward your chest to maximize pectoral recruitment.",
          "Lock your shoulders down and back—do not let your traps shrug.",
          "Squeeze your chest at the top of the movement for a 1-second pause."
        ]
      },
      {
        id: "u1_b2",
        name: "Lying Weighted Pullover",
        sets: 3,
        reps: "8-12",
        rest: "60 seconds (before B1)",
        defaultReps: 10,
        pairing: "B2",
        isSuperset: true,
        targetMuscle: "Lower Chest & Lat Stretch",
        setup: "Lie supine (on your back) on a flat bench or flat on the floor, holding your 14 kg loaded bookbag firmly by its ends directly over your chest.",
        form: "Maintain a soft, static bend in your elbows throughout the set. Lower the bookbag slowly in an arc behind your head.",
        cues: [
          "Keep elbows tucked closely together (pointing forward, not out) with a soft static bend.",
          "Lower slowly behind head, feel the deep stretch across your lower chest and lats.",
          "Pull back up ONLY until the bag is directly over your forehead to maintain continuous tension."
        ]
      },
      {
        id: "u1_c1",
        name: "Banded Lateral Raises (Scapular Plane)",
        sets: 4,
        reps: "12-15",
        rest: "45 seconds (after C2)",
        defaultReps: 12,
        pairing: "C1",
        isSuperset: true,
        targetMuscle: "Lateral Deltoids",
        setup: "Stand upright on the center of the band with feet together or hip-width apart. Hold the band handles/ends at your sides.",
        form: "Raise your arms outward and slightly forward, keeping a tiny bend in your elbows.",
        cues: [
          "Raise your arms 30 degrees forward from your sides (the scapular plane).",
          "This alignment matches the natural angle of the shoulder blades, reducing subacromial joint stress.",
          "Pour the 'pitchers of water' slightly at the top, pointing your knuckles outward."
        ]
      },
      {
        id: "u1_c2",
        name: "Seated Feet-Banded Face Pulls (Feet-Anchored)",
        sets: 4,
        reps: "12-15",
        rest: "45 seconds (before C1)",
        defaultReps: 12,
        pairing: "C2",
        isSuperset: true,
        targetMuscle: "Rear Deltoids & Rotator Cuff",
        setup: "Sit on the floor with your legs straight. Loop the resistance band securely around the soles of your feet and hold the ends.",
        form: "Pull the band up and back toward your nose, flaring your elbows high and wide.",
        cues: [
          "Pull the bands directly toward your nose or forehead.",
          "Flare your elbows back while actively squeezing your rear deltoids.",
          "Focus on external shoulder rotation by letting your hands end up higher than your elbows."
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
        setup: "Stand on the band with feet hip-width apart (or use the loaded bookbag). Grip ends with underhand grip.",
        form: "Curl your hands upward towards your shoulders, keeping your upper arms stationary.",
        cues: [
          "Keep elbows tucked firmly to your ribs—do not let them drift forward or flare out.",
          "Squeeze the biceps hard at the peak of the contraction.",
          "Avert swinging your torso; keep the posture rigid."
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
        setup: "Step on one end of the band with your back foot. Bring the other end behind your back, pulling it overhead with arms bent behind your neck.",
        form: "Keeping elbows pointing forward and close to your head, extend your elbows to push the band straight up to the ceiling.",
        cues: [
          "Pull overhead directly behind your neck and extend your arms straight upward toward the ceiling.",
          "Keep your elbows tucked in beside your ears; do not let them flare wide.",
          "Ensure your core remains braced to avoid hyperextending your lower back."
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
        name: "Shallow Wall Sit with VMO Co-Contraction",
        sets: 3,
        reps: "3 reps of 45s",
        rest: "30s rest between reps, 90s between main sets",
        defaultReps: 45,
        targetMuscle: "VMO (Quad Tracking) & Adductors",
        isHold: true,
        setup: "Lean your back flat against a wall, positioning your feet forward. Squeeze a small Swiss ball, yoga block, or rolled-up towel firmly between your knees.",
        form: "Lower your hips into a shallow squat, bending knees to only 45 degrees. Ensure high shin verticality.",
        cues: [
          "Keep a long Heel-to-Wall Distance (HTWD) to maintain perfectly vertical shins.",
          "Flex knees to only 45 degrees—avoid deeper angles to remain completely pain-free.",
          "Squeeze the object between your knees firmly; adductor recruitment co-activates the VMO, pulling the patella medially for improved tracking."
        ]
      },
      {
        id: "l1_b1",
        name: "Single-Leg Banded Romanian Deadlift (SL RDL)",
        sets: 3,
        reps: "10-15",
        rest: "90-120 seconds",
        defaultReps: 10,
        targetMuscle: "Glutes & Hamstrings",
        setup: "Stand on your bare foot on the center of the band. Grip the band ends in each hand, creating appropriate baseline tension.",
        form: "Hinge at the hips, sending your hips backwards while raising your non-working leg behind you as a lever.",
        cues: [
          "Focus on a pure hip hinge while keeping a soft, static 15-to-20-degree knee flexion on the active side.",
          "Keep your back foot pointed straight down to lock your pelvis in an even, neutral position.",
          "Stand on your bare foot; this maximizes sensory proprioception and ankle stability."
        ]
      },
      {
        id: "l1_c1",
        name: "Banded Unilateral Glute Bridge",
        sets: 3,
        reps: "10-15",
        rest: "90-120 seconds",
        defaultReps: 10,
        targetMuscle: "Gluteus Maximus",
        setup: "Lie supine on the floor, loop a band over your hips and anchor it, or place a looped band above your knees. Lift one leg off the ground.",
        form: "Drive through the heel of your grounded leg, pushing your hips up into the air until they form a straight line with knees and shoulders.",
        cues: [
          "Drive purely through your grounded heel and squeeze your glutes hard at the top.",
          "Do not hyperextend your lumbar spine; keep your lower abs braced to protect your back.",
          "Keep your hips perfectly level; do not let the unsupported hip sag down."
        ]
      },
      {
        id: "l1_d1",
        name: "Side-Lying Hip Abductions",
        sets: 3,
        reps: "10-15",
        rest: "60-90 seconds",
        defaultReps: 12,
        targetMuscle: "Gluteus Medius (Hip Stability)",
        setup: "Lie on your side on a mat, legs extended straight in line with your body. Rest your head on your bottom arm.",
        form: "Slowly raise your top leg upward in a controlled tempo, then lower it without touching the bottom leg.",
        cues: [
          "Slowly raise your top leg to approximately 45 degrees maximum.",
          "Keep your knee straight and toes pointed slightly down to isolate the gluteus medius.",
          "Do not roll your hips backward; keep them stacked vertically."
        ]
      },
      {
        id: "l1_d2",
        name: "Calf Raises",
        sets: 4,
        reps: "10-15",
        rest: "60-90 seconds",
        defaultReps: 12,
        targetMuscle: "Gastrocnemius & Soleus",
        setup: "Stand with your feet hip-width apart on flat floor or the edge of a stable step/platform.",
        form: "Press through the balls of your feet to raise your heels as high as possible, then lower slowly.",
        cues: [
          "Move slowly and deliberately.",
          "Pause for 1 second at full stretch at the bottom.",
          "Pause for 1 second at peak contraction on your toes."
        ]
      },
      {
        id: "l1_e1",
        name: "Confined-Space Unilateral Suitcase Carry",
        sets: 3,
        reps: "30-45s walk",
        rest: "60 seconds",
        defaultReps: 35,
        isHold: true,
        targetMuscle: "Anti-Lateral Core & Knee Stability",
        setup: "Stand tall, gripping your heavily loaded 14 kg bookbag directly by its top grab-handle on one side of your body.",
        form: "Maintain a perfectly upright posture. Walk in a straight line or back-and-forth in a tight space.",
        cues: [
          "Keep your torso perfectly upright—do not lean toward or away from the bag.",
          "Keep shoulders actively packed away from your ears; no slouching forward.",
          "Walk slowly and deliberately, taking 3 steps forward and 3 steps backward.",
          "Regression: If stepping triggers any knee discomfort, replace with Suitcase Marches in place (marching knees to hip height) to eliminate impact."
        ]
      },
      {
        id: "l1_e2",
        name: "Swiss Ball Dead Bug",
        sets: 3,
        reps: "8-10 per side",
        rest: "60 seconds",
        defaultReps: 8,
        targetMuscle: "Deep Core & Pelvic Anti-Extension",
        setup: "Lie supine on the floor. Hold a Swiss ball between your knees and your hands, with hips and knees bent at 90 degrees.",
        form: "Pressing the ball firmly, slowly extend one arm and the opposite leg away from each other toward the floor.",
        cues: [
          "Press your Swiss ball firmly between your hands and knees to lock the core.",
          "Keep your lower back fully pinned flat against the floor; do not let it arch.",
          "Extend opposite limbs slowly, hovering them just above the floor, and return with absolute control."
        ]
      }
    ]
  },
  {
    id: "upper2",
    name: "Upper Body Day 2",
    subtitle: "Upper 2",
    focus: "Vertical Push & Lat Thickness/Width (Hypertrophy Target)",
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
        targetMuscle: "Anterior Deltoids & Shoulders",
        setup: "Stand on the center of the band. Lift your hands to shoulder height, palms forward, creating baseline resistance.",
        form: "Brace your core and press the band directly overhead until your arms are locked out.",
        cues: [
          "Press straight overhead, finishing with your arms in line with your ears.",
          "Brace your core tightly—do not let your lower back arch as you press.",
          "Control the descent back to shoulder level."
        ]
      },
      {
        id: "u2_a2",
        name: "Lying Weighted Pullover (Lat Bias)",
        sets: 4,
        reps: "8-12",
        rest: "60 seconds (before A1)",
        defaultReps: 10,
        pairing: "A2",
        isSuperset: true,
        targetMuscle: "Lats & Lower Chest",
        setup: "Lie supine on a flat bench or secure floor surface, holding your 14 kg bookbag by its ends over your chest.",
        form: "Maintain a soft static elbow bend. Lower behind the head, accentuating the lat sweep.",
        cues: [
          "Keep elbows tucked closely together, pointing directly forward to isolate the lats.",
          "Lower the bag slowly, feeling a deep stretch down the sides of your torso.",
          "Pull back up only to forehead level to keep lat fibers under constant mechanical load."
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
        targetMuscle: "Upper Chest & Triceps Focus",
        setup: "Elevate both feet on a sturdy chair or couch. Place your resistance band across your upper back, anchoring the ends under hands with a close grip (closer than shoulder-width).",
        form: "Perform pushups with your elbows tucked close to your ribs, maintaining a rigid body line.",
        cues: [
          "Elevating feet on a chair shift mechanical tension to the upper-chest.",
          "The close-grip hand placement heavily boosts triceps loading.",
          "Lower until your chest almost touches the floor under high control."
        ]
      },
      {
        id: "u2_b2",
        name: "Seated Feet-Banded Row",
        sets: 3,
        reps: "8-12",
        rest: "60 seconds (before B1)",
        defaultReps: 10,
        pairing: "B2",
        isSuperset: true,
        targetMuscle: "Lower Lats & Back Width",
        setup: "Sit with legs straight on the floor. Securely loop the band around the bottoms of your feet and hold the ends.",
        form: "Sit up exceptionally tall. Pull the band toward your hips, driving elbows back.",
        cues: [
          "Sit up tall, squeeze your elbows tight to your ribs.",
          "Pull the band low toward the sides of your hips/waist.",
          "Focus on driving your elbows down and back toward your back pockets to isolate the diagonal fibers of your lower lats."
        ]
      },
      {
        id: "u2_c1",
        name: "One-Arm Weighted Bag Row",
        sets: 3,
        reps: "8-12",
        rest: "45 seconds (after C2)",
        defaultReps: 10,
        pairing: "C1",
        isSuperset: true,
        targetMuscle: "Latissimus Dorsi & Back Thickness",
        setup: "Hinge forward at your hip, placing one hand on a flat couch/bench or knee for support. Hold your loaded 14 kg bookbag in your free hand.",
        form: "Row the bookbag upward towards your lower ribcage/hip, keeping your arm close to your side.",
        cues: [
          "Focus on a controlled 3-second eccentric (lowering) phase to maximize hypertrophy.",
          "Pull the bag directly to your hip rather than your armpit to bias the lats.",
          "Avoid twisting your torso; keep your shoulders parallel to the floor."
        ]
      },
      {
        id: "u2_c2",
        name: "Banded Behind-the-Back Lateral Raises",
        sets: 3,
        reps: "12-15",
        rest: "45 seconds (before C1)",
        defaultReps: 12,
        pairing: "C2",
        isSuperset: true,
        targetMuscle: "Lateral Deltoids (Shoulder Cap)",
        setup: "Stand on the band with your opposite foot. Reach your active arm behind your back to grab the band.",
        form: "Raise your arm outward and slightly forward in the scapular plane, dragging the band behind you.",
        cues: [
          "Stand on the band with your opposite foot. Raise your arms 30 degrees forward from your sides (the scapular plane).",
          "This alignment matches the natural angle of the shoulder blades, reducing subacromial joint stress.",
          "Keep the lateral deltoid under continuous load without letting public traps engage."
        ]
      },
      {
        id: "u2_d1",
        name: "Biceps Mechanical Drop Set",
        sets: 3,
        reps: "Drop set to failure (≈10–12 reps)",
        rest: "2 minutes",
        defaultReps: 12,
        pairing: "D1",
        targetMuscle: "Biceps & Brachialis",
        setup: "Stand on the band with feet close. Hold the handles with your wrists.",
        form: "First, perform fully supinated (palms up) curls to failure. Then immediately switch grip to hammer (palms facing each other) and curl to failure again.",
        cues: [
          "Supinated band curl to failure (≈10–12 reps) → immediately switch to hammer curl to failure.",
          "Perform all reps on one arm first, then switch and do the other.",
          "Keep posture completely tall; squeeze intensely on every repetition."
        ]
      },
      {
        id: "u2_d2",
        name: "Seated Banded Rear-Delt Rows",
        sets: 3,
        reps: "10-15",
        rest: "60 seconds between sets",
        defaultReps: 12,
        pairing: "D2",
        targetMuscle: "Rear Deltoids",
        setup: "Sit on the floor with legs straight, loop the band around your feet, and hold the ends.",
        form: "Row the band toward your upper chest, keeping your elbows flared wide (shoulder height).",
        cues: [
          "Row with flared elbows (pulling to chest level).",
          "Keep elbows up at shoulder height to focus purely on rear deltoids and rhomboids.",
          "Hold a contraction at the chest for 1 second."
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
        name: "Shallow Wall Sit with VMO Co-Contraction",
        sets: 3,
        reps: "3 reps of 45s",
        rest: "30s rest between reps, 90s between main sets",
        defaultReps: 45,
        targetMuscle: "VMO (Quad Tracking) & Adductors",
        isHold: true,
        setup: "Lean your back flat against a wall, positioning your feet forward. Squeeze a small Swiss ball, yoga block, or rolled-up towel firmly between your knees.",
        form: "Lower your hips into a shallow squat, bending knees to only 45 degrees. Ensure high shin verticality.",
        cues: [
          "Keep a long Heel-to-Wall Distance (HTWD) to maintain perfectly vertical shins.",
          "Flex knees to only 45 degrees—avoid deeper angles to remain completely pain-free.",
          "Squeeze the object between your knees firmly; adductor recruitment co-activates the VMO, pulling the patella medially for improved tracking."
        ]
      },
      {
        id: "l2_b1",
        name: "Single-Leg Banded Romanian Deadlift (SL RDL)",
        sets: 3,
        reps: "10-15",
        rest: "90-120 seconds",
        defaultReps: 10,
        targetMuscle: "Glutes & Hamstrings Focus",
        setup: "Stand on your bare foot on the center of the band. Grip the band ends in each hand, creating appropriate baseline tension.",
        form: "Hinge at the hips, sending your hips backwards while raising your non-working leg behind you as a lever.",
        cues: [
          "Focus on hip hinging, slow eccentrics (3 seconds down) on the active side.",
          "Keep back foot pointed straight down to lock hips.",
          "Balance on bare foot to maximize ankle stabilization."
        ]
      },
      {
        id: "l2_c1",
        name: "Supine Swiss Ball Hamstring Curl",
        sets: 3,
        reps: "10-15",
        rest: "90-120 seconds",
        defaultReps: 12,
        targetMuscle: "Hamstrings (Knee Flexion)",
        setup: "Lie supine on your back on a mat, placing your calves and heels resting on top of a Swiss ball.",
        form: "Lift your hips into a bridge position, then roll the ball toward your glutes by bending your knees.",
        cues: [
          "Bridge up with your calves and heels resting on the Swiss ball, holding hips high.",
          "Slowly roll the ball toward your glutes by bending your knees while keeping hips raised high.",
          "The slow extension phase (rolling the ball back out) is the most critical for hamstring eccentrics—take 3 to 4 seconds."
        ]
      },
      {
        id: "l2_d1",
        name: "Banded Clamshells",
        sets: 3,
        reps: "10-15",
        rest: "60-90 seconds",
        defaultReps: 12,
        targetMuscle: "Gluteus Medius (Outer Hips)",
        setup: "Place a resistance band just above your knees. Lie on your side with hips at 45 degrees and knees bent at 90 degrees.",
        form: "Keeping your feet pinned together, slowly rotate your top knee upward as high as possible, then return.",
        cues: [
          "Slowly pivot your top knee upward without letting your pelvis or lower back rotate backward.",
          "Hold a 2-second hard contraction at the top of each rep, keeping your pelvis forward and locked.",
          "Squeeze the lateral glutes dynamically."
        ]
      },
      {
        id: "l2_d2",
        name: "Calf Raises",
        sets: 4,
        reps: "10-15",
        rest: "60-90 seconds",
        defaultReps: 12,
        targetMuscle: "Gastrocnemius & Calf Strength",
        setup: "Stand with your feet hip-width apart on flat floor or step ledge.",
        form: "Rise onto your toes, squeeze, and slowly sink back down.",
        cues: [
          "Move slowly and deliberately.",
          "Pause for 1 second at full stretch at the bottom.",
          "Pause for 1 second at peak contraction on your toes."
        ]
      },
      {
        id: "l2_e1",
        name: "Stir the Pot",
        sets: 3,
        reps: "8-10 slow circles",
        rest: "60-90 seconds",
        defaultReps: 8,
        targetMuscle: "Deep Core (Dynamic Anti-Extension)",
        setup: "Place your forearms on the Swiss ball in a plank position, toes on the floor.",
        form: "Position feet wider than shoulder-width apart to stabilize your hips. Move your elbows in a slow, circular motion.",
        cues: [
          "Keep your torso and pelvis completely still as you perform slow, tiny forearm circles clockwise, then counterclockwise.",
          "Squeeze your glutes tightly to maintain a neutral pelvic tilt.",
          "Take 3 seconds per circle; do not let your midsection or lower back sag."
        ]
      },
      {
        id: "l2_e2",
        name: "Knee-Supported Copenhagen Plank",
        sets: 3,
        reps: "15-30s hold",
        rest: "60 seconds",
        defaultReps: 20,
        isHold: true,
        targetMuscle: "Adductors / MCL Joint Protection",
        setup: "Lie on your side, perpendicular to a padded bench or stable chair. Place your top leg's knee, shin, and ankle fully supported on the bench.",
        form: "Lift your hips until your body forms a straight neutral line from head to knees. Hover the bottom leg.",
        cues: [
          "Ensure your top knee, shin, and ankle are fully supported on the bench to prevent torque on the knee joint.",
          "Lift your hips so your body forms a straight, neutral line from your shoulder to your knee.",
          "Hold the bottom leg hovering underneath the bench. This knee-assisted setup neutralizes dangerous valgus torque, protecting your MCL."
        ]
      }
    ]
  }
];

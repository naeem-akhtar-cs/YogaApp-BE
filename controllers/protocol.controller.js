import mongoose from "mongoose";
// import fs from "fs";
// import xlsx from "xlsx";

// import csv from "csv-parser";

import protocolCategory from "../models/protocolCategory.js";
import protocol from "../models/protocol.js";
import userProtocol from "../models/userProtocol.js";
import protocolTimeframe from "../models/protocolTimeframe.js";
import timeframeExercise from "../models/timeframeExercise.js";

const getProtocols = async (req, res) => {
  try {
    const protocolCategories = await protocolCategory.aggregate([
      {
        $lookup: {
          from: "protocol",
          localField: "_id",
          foreignField: "category",
          as: "protocols",
        },
      },
    ]);
    res.status(200).send(protocolCategories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Could not get protocols" });
  }
};

const getProtocolInfo = async (req, res) => {
  try {
    const protocolList = req.body;
    if (!protocolList || protocolList.length <= 0) {
      return res.status(400).send({ message: "Protocol Id is required" });
    }
    const protocolInfo = await protocol.find({
      _id: { $in: protocolList },
    });
    res.status(200).send(protocolInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Could not get protocols" });
  }
};

/**
 * Dev route
 */
// const updateDescription = async (req, res) => {
//   try {
//     const results = [];

//     fs.createReadStream("data/results.csv")
//       .pipe(csv())
//       .on("data", (data) => results.push(data))
//       .on("end", async () => {
//         for (let index = 0; index < results.length; index++) {
//           try {
//             const protocolData = results[index];

//             const protocolCode = protocolData["protocol_code"];
//             let protocolFields = JSON.parse(protocolData["fields"]);
//             const planId = protocolFields?.plan_id?.S;

//             if (planId) {
//               let myProtocol = await protocol.findOne({ protocolCode });
//               if (myProtocol) {
//                 if (!myProtocol.stripePlanId) {
//                   myProtocol.stripePlanId = planId;

//                   await protocol.findOneAndUpdate(
//                     { protocolCode: protocolCode },
//                     myProtocol
//                   );
//                   console.log("OK", protocolCode);
//                 }
//               } else {
//                 console.log(protocolCode);
//               }
//             }
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       });

//     // return updatedProtocol;
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Could not get protocols" });
//   }
// };

// const updateExercises = async (req, res) => {
//   try {
//     const results = [];

//     fs.createReadStream("data/results_1.csv")
//       .pipe(csv())
//       .on("data", (data) => results.push(data))
//       .on("end", async () => {
//         for (let index = 0; index < results.length; index++) {
//           const protocol = results[index];
//           const fields = JSON.parse(protocol["fields"]);
//           let protocolData = await protocolModel.findOne({
//             protocolCode: protocol.protocol_code,
//           });
//           let protocolId = protocolData._id;

//           const timeframes = fields.timeframes.L;
//           for (let i = 0; i < timeframes.length; i++) {
//             const frame = timeframes[i].M;

//             const currentDate = new Date();
//             const timeframe = await protocolTimeframeModel.create({
//               _id: new mongoose.Types.ObjectId(),
//               position: i + 1,
//               fromDuration: parseInt(frame.from_duration.S),
//               toDuration: parseInt(frame.to_duration.S),
//               totalDuration: parseInt(frame.to_duration.S),
//               precautions: frame.precautions.S,
//               progressionCriteria: frame.progression_criteria.S,
//               goal: frame.timeframe_goal.S,
//               instructions: frame.timeframe_instruction.S,
//               protocolId: protocolId,
//               createdAt: currentDate,
//               updatedAt: null,
//             });

//             const timeframeId = timeframe._id.toString();
//             console.log(`Timeframe: ${timeframeId}`);
//             const timeframeExercises = frame.exercises.L;

//             for (let j = 0; j < timeframeExercises.length; j++) {
//               const exercise = timeframeExercises[j].M;
//               try {
//                 const timeframeExercise = await timeframeExerciseModel.create({
//                   _id: new mongoose.Types.ObjectId(),
//                   position: j + 1,
//                   name: exercise.name.S,
//                   description: exercise.description.S,
//                   type: exercise.type.S,
//                   region: exercise.body_region.S,
//                   defaultFrequency: exercise?.default_freq?.S == undefined ? null : exercise?.default_freq?.S,
//                   frequency: exercise?.freq?.S == undefined ? null : exercise?.freq?.S,
//                   defaultRepetition: exercise?.default_reps?.S == undefined ? null: exercise?.default_reps?.S,
//                   repetition: exercise?.reps?.S == undefined ? null : exercise?.reps?.S,
//                   defaultSets: isNaN(parseInt(exercise?.default_set?.S)) ? null : parseInt(exercise?.default_set?.S),
//                   sets: isNaN(parseInt(exercise?.set?.S)) ? null : parseInt(exercise?.set?.S),
//                   defaultWeight: isNaN(parseInt(exercise?.default_wgt?.S)) ? null : parseInt(exercise?.default_wgt?.S),
//                   weight: isNaN(parseInt(exercise?.wgt?.S)) ? null : parseInt(exercise?.wgt?.S),
//                   imageUrl: exercise?.imagefile_url?.S == undefined ? null: exercise.imagefile_url.S,
//                   videoUrl: exercise?.videofile_url?.S == undefined ? null: exercise.videofile_url.S,
//                   isDeleted: false,
//                   timeframeId: timeframeId,
//                   createdAt: currentDate,
//                   updatedAt: null,
//                 });
//                 const exerciseId = timeframeExercise._id.toString();
//                 console.log(`Exercise: ${exerciseId}`);
//               } catch (error) {
//                 console.log(error);
//               }
//             }
//           }
//         }
//       });

//     console.log("Done");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Could not get protocols" });
//   }
// };

// const getVideos = async (req, res) => {
//   const batchSize = 50;
//   let skip = 0;

//   const missingVideos = []

//   try {
//     while (true) {
//       const timeframes = await timeframeExercise.find().skip(skip).limit(batchSize);
//       if (timeframes.length === 0) break; // Exit the loop if no more timeframes

//       const fetchPromises = timeframes.map(timeframe => {
//         const videoUrl = `https://mehab.s3.amazonaws.com/videos/${timeframe.videoUrl}`;
//         const requestOptions = {
//           method: "GET",
//           redirect: "follow"
//         };

//         return fetch(videoUrl, requestOptions)
//           .then(response => ({
//             videoUrl,
//             statusCode: response.status,
//             id: timeframe._id.toString()
//           }))
//           .catch(error => ({
//             videoUrl,
//             error
//           }));
//       });

//       const results = await Promise.all(fetchPromises);

//       results.forEach(result => {
//         if (result.statusCode !== 200) {
//           console.error(`Status code: ${result.statusCode}`);
//           missingVideos.push(result.id)
//         }
//       });

//       skip += batchSize; // Move to the next batch
//       console.log(`Processing from: ${skip}`);
//     }
//     console.log(`Missing Videos: ${missingVideos.length}`);

//     const invalidTimeframes = await timeframeExercise.find({ _id: { $in: missingVideos } }).select("_id videoUrl name description");

//     const data = invalidTimeframes.map(tf => ({
//       ID: tf._id.toString(),
//       VideoURL: tf.videoUrl,
//       Name: tf.name,
//       Description: tf.description
//     }));

//     // Create a new workbook and add a worksheet
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(data);
//     xlsx.utils.book_append_sheet(wb, ws, 'Missing Videos');

//     // Write the workbook to a file
//     const filePath = './MissingVideos.xlsx';
//     xlsx.writeFile(wb, filePath);


//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

const getUserProtocols = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      console.log("Error: User id is required");
      throw new Error("User id is required");
    }

    console.log(`Fetching protocols for user: ${userId}`);
    
    const userProtocols = await userProtocol
      .find({
        isActive: true,
        user: mongoose.Types.ObjectId.createFromHexString(userId),
      })
      .populate({
        path: "protocol",
        select: "_id name",
      })
      .select("_id");

    console.log("User Protocols:", userProtocols);
    
    res.status(200).send(userProtocols);
  } catch (error) {
    console.log("Error in getUserProtocols:", error);
    res.status(400).send({ message: "Invalid input" });
  }
};

const getProtocolTimeframes = async (req, res) => {
  try {
    let protocolId = req.query.protocolId;
    const userId = req.query.userId;
    if (!protocolId || !userId) {
      console.log("Error: Invalid arguments");
      throw new Error("Invalid arguments");
    }

    console.log(`Fetching timeframes for protocol: ${protocolId} and user: ${userId}`);
    
    const userProtocols = await userProtocol
      .find({
        isActive: true,
        user: mongoose.Types.ObjectId.createFromHexString(userId),
        protocol: mongoose.Types.ObjectId.createFromHexString(protocolId),
      })
      .select("protocol");

    console.log("User Protocols:", userProtocols);

    let protocolTimeframes = [];
    if (userProtocols.length >= 1) {
      protocolId = userProtocols[0].protocol.toString();
      protocolTimeframes = await protocol.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId.createFromHexString(protocolId),
          },
        },
        {
          $lookup: {
            from: "protocolTimeframe",
            localField: "_id",
            foreignField: "protocol",
            as: "protocolTimeframes",
          },
        },
        {
          $unwind: "$protocolTimeframes",
        },
        {
          $sort: {
            "protocolTimeframes.position": 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            protocolTimeframes: { $push: "$protocolTimeframes" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            protocolTimeframes: {
              _id: 1,
              fromDuration: 1,
              toDuration: 1,
            },
          },
        },
      ]);

      console.log("Protocol Timeframes:", protocolTimeframes);
    } else {
      console.log("No active protocol for current user");
      throw new Error("No active protocol for current user");
    }

    if (protocolTimeframes.length >= 1) {
      protocolTimeframes = protocolTimeframes[0];
    } else {
    
      protocolTimeframes = {
        _id: protocolId,
        name: "Protocol Name",
        protocolTimeframes: []
      };
    }

    res.status(200).send(protocolTimeframes);
  } catch (error) {
    console.log("Error in getProtocolTimeframes:", error);
    res.status(400).send({ message: "Invalid input" });
  }
};


const getTimeframeExercise = async (req, res) => {
  try {
    let protocolId = req.query.protocolId;
    let timeframeId = req.query.timeframeId;
    const userId = req.query.userId;
    if (!protocolId || !userId) {
      console.log("Error: Invalid arguments");
      throw new Error("Invalid arguments");
    }

    console.log(`Fetching exercises for protocol: ${protocolId}, timeframe: ${timeframeId}, user: ${userId}`);
    
    const userProtocols = await userProtocol
      .find({
        isActive: true,
        user: mongoose.Types.ObjectId.createFromHexString(userId),
        protocol: mongoose.Types.ObjectId.createFromHexString(protocolId),
      })
      .select("protocol");

    console.log("User Protocols:", userProtocols);

    let timeframeExercises = null;
    if (userProtocols.length >= 1) {
      protocolId = userProtocols[0].protocol.toString();

      const protocolTimeframeData = await protocolTimeframe.findOne({
        _id: timeframeId,
        protocol: protocolId,
      });
      if (!protocolTimeframeData) {
        console.log("Error: Invalid protocol timeframe");
        throw new Error("Invalid protocol timeframe");
      }

      timeframeExercises = await timeframeExercise
        .find({
          protocolTimeframe: timeframeId,
        })
        .sort({ position: "asc" })
        .select(
          "_id name description repetition sets frequency imageUrl videoUrl"
        );

      console.log("Timeframe Exercises:", timeframeExercises);
    } else {
      console.log("No active protocol for current user");
      throw new Error("No active protocol for current user");
    }

    res.status(200).send(timeframeExercises);
  } catch (error) {
    console.log("Error in getTimeframeExercise:", error);
    res.status(400).send({ message: "Invalid input" });
  }
};

export default {
  getProtocols,
  getProtocolInfo,
  getUserProtocols,
  getProtocolTimeframes,
  getTimeframeExercise,
  // getVideos
};

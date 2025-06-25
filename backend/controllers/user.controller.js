import { json, response } from "express";
import uploadOncloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment";
export const getCurrentUser=async(req,res)=>{

    try {
        const userId=req.userId;
        const user= await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({message:"getCurrentUser failed", error: error.message});
    } 
}

export const updateAssistant = async (req, res) => {
  try {
    const assistantName = req.body.assistantName;
    const imageUrl = req.body.imageUrl;

    let assistantImage;

    if (req.file) {
      assistantImage = await uploadOncloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    const userId = req.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json({ message: "Assistant updated successfully", user });

  } catch (error) {
    return res.status(500).json({ message: "updateAssistant failed", error: error.message });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    console.log("📥 Received command:", command);
    const user = await User.findById(req.userId);
    const userName = user?.name || "User";
    const assistantName = user?.assistantName || "Nova";
    user.history.push(command);
    await user.save(); // Save the command to user's history
    const result = await geminiResponse(command, assistantName, userName);
    console.log("🧠 Gemini raw result:", result);

    const cleaned = result.replace(/```json|```/g, "").trim();

    let gemResult;
    try {
      gemResult = JSON.parse(cleaned);
      console.log("✅ Parsed Gemini Response:", gemResult);
    } catch (error) {
      console.error("❌ JSON Parse Error:", error.message, cleaned);
      return res
        .status(400)
        .json({ message: "Invalid JSON from Gemini", error: error.message });
    }

    const { type, userInput, response } = gemResult;

    if (!type || response === undefined || response === null) {
      return res
        .status(400)
        .json({ message: "Incomplete response from Gemini" });
    }

    // Handle time/date/day/month
    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });

      case "get_time":
        return res.json({
          type,
          userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case "get_day":
        return res.json({
          type,
          userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get_month":
        return res.json({
          type,
          userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });

      default:
        return res.json({ type, userInput, response });
    }
    
  } catch (error) {
    console.error("❌ Ask assistant error:", error.message);
    return res.status(500).json({
      error: "Failed to get response from assistant.",
    });
  }
};


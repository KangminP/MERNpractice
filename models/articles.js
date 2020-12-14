const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        articleimg: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles;

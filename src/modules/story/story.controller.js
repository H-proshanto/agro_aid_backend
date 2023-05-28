const Story = require('./story.model');
const ProductStory = require('./product-description.model');

const getStories = async (req, res) => {
    try {
        const stories = await Story.findAll();

        res.status(200).send(stories);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const getStoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const story = await Story.findOne({
            where: { id },
        });

        if (!story) return res.status(404).send('No such story');

        res.status(200).send(story);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports =
{
    getStories,
    getStoryById
}

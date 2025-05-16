import costumersModel from "../models/costumers.js"

// Empty function array 
const costumersController = {};

// SELECT 
costumersController.getAllCostumers = async (req,res) => {  
    const costumers = await costumersModel.find();
    res.json(costumers);
}

// INSERT
costumersController.insertCostumers = async (req,res) => {
    const { name,email,password,telephone,address, dui } = req.body;
    
    // Save everything in the DB.
    const newCostumer = new costumersModel({name,email,password,telephone,address, dui})
    await newCostumer.save();

    res.json({message: "Costumer saved! "})
}

// DELETE
costumersController.deleteCostumer = async (req, res) => {
    const deleteCostumer = await costumersModel.findByIdAndDelete(req.params.id);
      if (!deleteCostumer) {
        return res.status(404).json({ message: "Costumer wasn't found!" });
      }
      res.json({ message: "Costumer deleted!" });
    };
    
    // UPDATE
    costumersController.updateCostumer = async (req, res) => {
      // Solicito todos los valores
      const { name,email,password,telephone,address, dui  } = req.body;
      // Actualizo
      await costumersModel.findByIdAndUpdate(
        req.params.id,
        {
            name,email,password,telephone,address, dui 
        },
        { new: true }
      );
      // muestro un mensaje que todo se actualizo
      res.json({ message: "Costumer updated!"});
    };

export default costumersController;
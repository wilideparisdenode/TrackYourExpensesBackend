const income=require("../model/incomeModel.js");

const addIncome=async(req,res)=>{
    let {amount,source,description,date,user_id}=req.body;

    await income.create({amount,source,description,date,user_id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err)
        res.status(400);
        throw new Error(err);
    })
}

const getAllIncome=async(req,res)=>{
    await income.findAll().then((data)=>{
        res.send(data);
    }
    ).catch((err)=>{
        res.send(err)
        res.status(400);
    })
}

const getAllIncomeByUserId=async(req,res)=>{
    let userId=req.params.userId;
    income.findAll({
        where:{
            user_id:userId
        }
    }).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err)
        res.status(400);
    })
}
const getIncomeByDate=async(req,res)=>{
    let {date}=req.body;
    let userId=req.params.userId
    income.findAll({
        where:{
            date:{
               date
            },user_id:{
                userId
            }
        }
    }).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err)
        res.status(400);
    })
}
const deleteIncome = async (req, res) => {
    const { id } = req.params;
const {userId } = req.query;
    try {
        const deletedRows = await income.destroy({
            where: {
                id: parseInt(id),
                user_id: parseInt(userId)
            }
        });

        if (deletedRows > 0) {
            return res.sendStatus(200); // Successfully deleted
        } else {
            return res.status(404).json({ message: "Income record not found" }); // Not found
        }
    } catch (err) {
        return res.status(500).json({ error: err.message }); // Internal server error
    }
};
const editIncome = async (req, res) => {
    const { id } = req.params;
    
    const { amount, source, description, date } = req.body;

    try {
        const [updatedRows] = await income.update(
            { amount, source, description, date },
            {
                where: {
                    id: parseInt(id),
                },
                returning: true // For PostgreSQL
            }
        );

        if (updatedRows > 0) {
            const updatedIncome = await income.findOne({
                where: {
                    id: parseInt(id),
                                   }
            });
            return res.status(200).json(updatedIncome);
        } else {
            return res.status(404).json({ message: "Income record not found or not updated" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

 module.exports = {
    editIncome,
    addIncome,
    getAllIncome,
    getAllIncomeByUserId,
    getIncomeByDate,
    deleteIncome
};
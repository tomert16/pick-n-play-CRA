const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.db'
});

//create fields table
const Field = sequelize.define('fields', {
    field_name: DataTypes.STRING,
    img_url: DataTypes.STRING,
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
})

// const syncToDatabase = async () => {
//     try {
//         await Field.sync();
//         console.log('Successfully synced to database');
//     } catch(err) {
//         console.log("Failed to sync to database:", err);
//     }
// };
// syncToDatabase()

// const createSeeds = async () => {
//     try {
//         await Field.bulkCreate([ 
//             {
//                 field_name: 'Bushwick Inlet Park',
//                 img_url: "https://static01.nyt.com/images/2015/06/01/arts/02BUSHWICKPARKWEB/02BUSHWICKPARKWEB-superJumbo.jpg", 
//                 location_id: 1
//             },
//             {
//                 field_name: "Central Park", 
//                 img_url: "https://www.travelandleisure.com/thmb/eLBXoYxyf5ohCsUimXwiePr-TlE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/central-park-new-york-city-WHEREYOU0118-fb2c3b1bf36d40258ec2788145fa5581.jpg", 
//                 location_id: 1
//             },
//             {
//                 field_name: "Riverside Park", 
//                 img_url: "https://i.pinimg.com/736x/4f/4f/54/4f4f54fbe6c35b3e6acac336a2e0ca48--landscape-plaza-landscape-design.jpg", 
//                 location_id: 1
//             },
//             {
//                 field_name: "Globall Sports Center", 
//                 img_url: "https://globallsportscenters.com/wp-content/uploads/2021/09/gsc_brooklyn3.jpg", 
//                 location_id: 1
//             },
//             {
//                 field_name: "Bayfront Park", 
//                 img_url: "https://img1.10bestmedia.com/Images/Photos/298797/p-295746-236296846432033-460336117-n_55_660x440.jpg", 
//                 location_id: 2
//             },
//             {
//                 field_name: "Founders Park", 
//                 img_url: "https://sfmn.fiu.edu/wp-content/uploads/2019/10/Artificial-turf-1024x768.png",
//                 location_id: 2
//             },
//             {
//                 field_name: "Flamingo Park", 
//                 img_url: "https://www.parks.fortlauderdale.gov/home/showpublishedimage/4447/637635776252770000",
//                 location_id: 2
//             },
//             {
//                 field_name: "Morgan Levy Park",
//                 img_url: "https://doral8401.sharepoint.com/adx_webfile/Parks/morgan-levy-turf-4.jpg?ga=1", 
//                 location_id: 2
//             }
//         ]
//         );
//         console.log("Field seeds created");
//     } catch (err) {
//         console.log("Failed to create:", err);
//     }
// }
// createSeeds();

module.exports = { Field }

const express = require('express');

const bodyParser = require('body-parser');

const port = '4000';
const host = '127.0.0.1';

const ejs = require('ejs');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const otherRoutes = require('./routes/otherRoute');

const  sequelize = require('./utils/dbconnect');
const User = require('./models/user');
const Address = require('./models/address');
const Admin = require('./models/admin');
const Complain = require('./models/complain');
const Resource = require('./models/resource');
const DustLocation = require('./models/dustLocation');
const UserComplain = require('./models/userComplain');
const AdminComplain = require('./models/adminComplain');
const ResourceComplain = require('./models/resourceComplain');


//app.use(bodyParser.urlencoded({ extended: false}));

// app.use('/admin', (req, res, next) =>{
//     res.send('<h1>hello server</h1>');
//     res.end();
// }); 


app.use('/admin', adminRoutes);
//app.use(userRoutes);
//app.use(otherRoutes);

User.belongsTo(Address, {constraints: true, onDelete: 'CASCADE'});
Admin.belongsTo(Address, {constraints: true, onDelete: 'CASCADE'});
Complain.belongsTo(DustLocation);
User.belongsToMany(Complain, {through: UserComplain });
Complain.belongsToMany(User, {through: UserComplain });
Admin.belongsToMany(Complain, {through: AdminComplain });
Complain.belongsToMany(Admin, {through: AdminComplain });
Resource.belongsToMany(Complain, {through: ResourceComplain });
Complain.belongsToMany(Resource, {through: ResourceComplain });


sequelize.sync({force: true})
.then(result => {
  console.log(result);
  const server = app.listen(port, function () {
    console.log(`server is running at ${host} on port ${port}` 
    );
});

})
.catch(err => console.log(err));


const bcrypt =require('bcrypt');
const { redirect } = require('express/lib/response');

function index(req, res) {
  if (req.session.loggedin) {
		// Output username
    res.redirect('/');

  } else {
    res.render('login/index');
  }
}

function register(req, res) {
  if(req.session.loggedin !=true){
  res.render('login/register');
  }else{
    res.redirect('/');
  }
}

function login(req,res){
  if(req.session.loggedin !=true){
  res.render('login/index');
}else{
  res.redirect('/');
}
}

function auth(req, res) {
  const data =req.body;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {

      if(userdata.length > 0) {

        userdata.forEach(element => {
          bcrypt.compare(data.password,element.password, (err,isMatch) => {
            if(data.password != element.password){
              res.render('login/index' ,{ error:'Error:incorrect password!'});
              console.log(data.password +" " + element.password);
              console.log(typeof(data.password) +" " + typeof(element.password));
              
            }else{
              req.session.loggedin=true;
              req.session.name=element.name;
              res.redirect('/');
              
             
            }
          });
        });
        
      } else {
        res.render('login/index',{error:'Error: user not exists! '});
        
        
      }
      
      /* req.session.loggedin = true;
	req.session.name = name;

  res.redirect('/'); */
      
    });
  });
}

function logout(req, res) {
  if (req.session.loggedin==true) {
    req.session.destroy();
  }
  res.redirect('/login');
}
function storeUser(req,res){
  const data=req.body;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
      if(userdata.length > 0) {
        res.render('login/register',{error:'Error:user already created'});
      } else {
        bcrypt.hash(data.password,12).then(hash =>{   
         
          req.getConnection((err,conn)=>{
            conn.query('INSERT INTO users SET?',[data],(err,rows) =>{
              req.session.loggedin=true;
              req.session.name=data.name;
              res.redirect('/');
            });
          });
      });
      }
      /*
      req.session.loggedin = true;
	req.session.name = name;

  res.redirect('/');*/
      
    });
  });


 }

module.exports = {
  index,
  login,
  register,
  auth,
  storeUser,
  logout,
}

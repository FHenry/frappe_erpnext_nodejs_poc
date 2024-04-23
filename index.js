const express = require("express")
let app = express()

app.get("/", function (request, response) {
    let HTMLresponse = '';
    HTMLresponse = "Hello World!";

    let {FrappeApp} = require('frappe-js-sdk')

    const frappe = new FrappeApp('http://frappe:8000',
        {
            useToken: true,
            // Pass a custom function that returns the token as a string - this could be fetched from LocalStorage or auth providers like Firebase, Auth0 etc.
            token: function () {
                return "4d72b77821fffda:d48952710a816c8"
            },
            // token: getTokenFromLocalStorage(),
            // This can be "Bearer" or "token"
            //type: "token"
            type: "token"
        },"","erpnextfr15.local"
    );

    const auth = frappe.auth();
    const db = frappe.db();

    auth
        .loginWithUsernamePassword({username: 'Administrator', password: 'admin'})
        .then(function (responseAuth) {
            console.log('Logged In');
            HTMLresponse += '<BR>Logged in';
            auth
                .getLoggedInUser()
                .then((user) => {
                    console.log(`User ${user} is logged in.`);
                    HTMLresponse += '<BR>' + `User ${user} is logged in.`;
                    db.getDocList('Customer')
                        .then((docs) => {
                            console.log(docs)
                            HTMLresponse += '<BR>' + JSON.stringify(docs);

                            auth
                                .logout()
                                .then(() => {
                                    console.log('Logged out.')
                                    HTMLresponse += '<BR>' + 'Logged out.';
                                    response.send(HTMLresponse);
                                })
                                .catch((error) => console.error(error));
                        })
                        .catch((error) => console.error(error));
                })
                .catch((error) => console.error(error));

        })
        .catch((error) => console.error(error))


})
app.listen(8888, function () {
    console.log("Started application on port %d", 8888)
});

// Login Form
function removeLoginErrors()
{
    if(!document.getElementById('LoginMessage2').classList.contains('hidden'))
    {
        document.getElementById('LoginMessage2').classList.add('hidden');
    }
    if(!document.getElementById('LoginMessage1').classList.contains('hidden'))
    {
        document.getElementById('LoginMessage1').classList.add('hidden');
    }

    if(!document.getElementById('LoginMessage2').classList.contains('hidden'))
    {
        document.getElementById('LoginMessage2').classList.add('hidden');
    }
    if(document.getElementById('LoginPasswordInputField').parentElement.classList.contains('error'))
    {
        document.getElementById('LoginPasswordInputField').parentElement.classList.remove('error');
    }
}

$('#LoginFormID').submit(function(e){
    e.preventDefault();

    $(':focus').blur()

    let Password = document.getElementById('LoginPasswordInputField').value;
    if(Password.length<8)
    {
        if(document.getElementById('LoginMessage1').classList.contains('hidden'))
        {
            document.getElementById('LoginMessage1').classList.remove('hidden');
        }
        if(!document.getElementById('LoginPasswordInputField').parentElement.classList.contains('error'))
        {
            document.getElementById('LoginPasswordInputField').parentElement.classList.add('error');
        }
        return false;
    }

    $.ajax({
        async:true,
        url:'/auth/logincheck',
        type:'POST',
        data : {
            Email : document.getElementById('LoginEmailInputField').value,
            Password : document.getElementById('LoginPasswordInputField').value,
        }
    }).done(data=>{
        console.log(data);
        if(data.Correct==1)
        {
            $('#LoginFormID').unbind('submit').submit();
        }
        else
        {
            if(document.getElementById('LoginMessage2').classList.contains('hidden'))
            {
                document.getElementById('LoginMessage2').classList.remove('hidden');
            }
        }
    })
})



// Register Form

function removeRegisterError()
{
    console.log("Removong error");
    if(document.getElementById('RegisterEmailInputField').parentElement.classList.contains('error'))
    {
        document.getElementById('RegisterEmailInputField').parentElement.classList.remove('error');
    }
    if(!document.getElementById('RegisterMessage2').classList.contains('hidden'))
    {
        document.getElementById('RegisterMessage2').classList.add('hidden');
    }

    if(!document.getElementById('RegisterMessage1').classList.contains('hidden'))
    {
        document.getElementById('RegisterMessage1').classList.add('hidden');
    }

    if(document.getElementById('RegisterPasswordInputField').parentElement.classList.contains('error'))
    {
        document.getElementById('RegisterPasswordInputField').parentElement.classList.remove('error');
    }
}

$('#RegisterFormID').submit(function(e){
    e.preventDefault();

    $(':focus').blur()

    let Password = document.getElementById('RegisterPasswordInputField').value;
    if(Password.length<8)
    {
        if(document.getElementById('RegisterMessage1').classList.contains('hidden'))
        {
            document.getElementById('RegisterMessage1').classList.remove('hidden');
        }
        if(!document.getElementById('RegisterPasswordInputField').parentElement.classList.contains('error'))
        {
            document.getElementById('RegisterPasswordInputField').parentElement.classList.add('error');
        }
        return false;
    }

    $.ajax({
        async:true,
        url:'/auth/registercheck',
        type:'POST',
        data : {
            Email : document.getElementById('RegisterEmailInputField').value,
        }
    }).done(data=>{
        console.log(data);
        if(data.Correct==1)
        {
            $('#RegisterFormID').unbind('submit').submit();
        }
        else
        {
            // Email exists
            if(document.getElementById('RegisterMessage2').classList.contains('hidden'))
            {
                document.getElementById('RegisterMessage2').classList.remove('hidden');
            }
            if(!document.getElementById('RegisterEmailInputField').parentElement.classList.contains('error'))
            {
                document.getElementById('RegisterEmailInputField').parentElement.classList.add('error');
            }

        }
    })
})



// Password forget
function ForgetPass()
{
    let email = prompt("Enter your email address");
    $.ajax({
        async : true,
        data : {
            Email : email
        },
        url : "/auth/forgetPass",
        type:'POST',
    }).done(data=>{
        if(data.Correct==1)
        {
            confirm("Your new Password is sent to your Email ID, if valid.")
        }
        else
        {
            confirm("There occured some problem. Please try again.")
        }
    })
}
const rs = require('readline-sync');
let exp;
let flag=false;
let temp='';

class stack
{
    push(character)
    {
        this.character = character;
        this.arr[++this.top] = this.character;
    }
    pop()
    {
        if(this.top === -1)
        {
            return -1;
        }
        else
        {
            this.top--;
            return this.arr.splice(this.top+1,1);
        }
    }
    peep()
    {
        if(this.top === -1)
        {
            return -1;
        }
        else
        {
            return this.arr[this.top];
        }
    }
    constructor()
    {
        this.arr = [];
        this.character = '';
        this.top = -1;
        this.i;
    }
}

function priority(character)
{
    if(character === '/' || character === '%')
    {
        return 4;
    }
    else if(character === '*')
    {
        return 3;
    }
    else if(character === '+')
    {
        return 2;
    }
    else if(character === '-')
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function evaluate(rpn)
{
    let charstack = new stack;
    for(i = 0; i < rpn.length; i++)
    {
        if(rpn.charAt(i) === '+' || rpn.charAt(i) === '-' || rpn.charAt(i) === '*' || rpn.charAt(i) === '/'|| rpn.charAt(i) === '%')//||(exp.charAt(i)==='P'&&exp,chaAt(i+1)==='O'&&exp.charAt(i+2)==='W'))
        {
            let val1 = charstack.pop();  
            let val2 = charstack.pop(); 
            val1 = parseFloat(val1);
            val2 = parseFloat(val2);
            if(val1 === NaN || val2 === NaN)
            {
                console.log('A value can\'t be string or char');
                    return;
            }
            switch (rpn.charAt(i))
            {  
                case '+': 
                charstack.push(val2 + val1); 
                break;  
                case '-': 
                charstack.push(val2 - val1); 
                break;  
                case '*': 
                charstack.push(val2 * val1); 
                break;  
                case '/': 
                if(val1 !== 0)
                {
                    charstack.push(val2/val1); 
                }
                else
                {
                    console.log('A value can\'t be divided by 0');
                    return;
                }

                break; 
                case '%': 
                if(val1 !== 0)
                {
                    charstack.push(val2%val1); 
                }
                else
                {
                    console.log('A value can\'t be divided by 0');
                    return;
                }
                break; 
            }
        }
        else if(rpn.charAt(i) !== ' ')
        {
            temp+=rpn.charAt(i);
        }
        else
        {
            if(temp!=='')
            {
                charstack.push(temp);
                temp='';
            }
        }
    }
    console.log("The evaluation is :"+charstack.pop());
}
while(true)
{
    let rpn = '';
    let operatorstack = new stack;
    exp = rs.question("Enter an infix expression you wish to convert: ");
    if(exp === 'quit' || exp === 'Q' || exp === 'Quit' || exp === 'q')
    { 
        console.log('GOODBYEE!');
        break;
    }
    console.log();
    for(i = 0; i < exp.length; i++)
    {
        
        if(exp.charAt(i) === '+' || exp.charAt(i) === '-' || exp.charAt(i) === '*' || exp.charAt(i) === '/'||exp.charAt(i)==='%')//||(exp.charAt(i)==='P'&&exp,chaAt(i+1)==='O'&&exp.charAt(i+2)==='W'))
        {
            flag=true;
            if(priority(operatorstack.peep()) <= priority(exp.charAt(i))&& operatorstack.peep() !== -1)
            {
                rpn += ' ';
                rpn += operatorstack.pop();
                operatorstack.push(exp.charAt(i));
            }
            else
            {
                operatorstack.push(exp.charAt(i));
            }
        }
        else if(exp.charAt(i) === '(')
        {
            operatorstack.push(exp.charAt(i));
        }
        else if(exp.charAt(i) === ')')
        {
            while(operatorstack.peep() != '(')
            {
                rpn += ' '; 
                rpn += operatorstack.pop();
            }
            operatorstack.pop();
        }
        else if(exp.charAt(i) === ' ')
        {
        }
        else
        {
            if(flag)
            {
                rpn += ' ';
                flag=false;
            }
            rpn += exp.charAt(i);
            
        }
    }
    while(true)
    {
        if(operatorstack.peep() != -1)
        {
            rpn += ' ';
            rpn += operatorstack.pop();
            
        }
        else
        {
            break;
        }
    }
    process.stdout.write("The Reverse Polish Notation for "+ exp +" is "+ rpn);
    console.log();
    evaluate(rpn);
}

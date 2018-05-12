/*
    Title: 			TemmeJS
    Version: 		0.1.0
    Author: 		Eoussama
    Description: 	Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS, with no doubts, Emmet saved us from the headache of working with HTML and CSS, and now, Temme is doing Javascript the same favour too.
    License:		MIT
*/

function Temme(query, container = document.body) {
    if(typeof query !== 'string')
        console.error("The query has to be a string");
    else if (container === undefined || container === null)
        console.error("Cannot append to undefined");
    else {
        let
            elements_str = query.split(' '),
            elements_obj = [createElement(elements_str[0])],
            dom = elements_obj[0],
            index = 0;


        while(elements_str[++index] !== undefined) {
            elements_obj.push(createElement(elements_str[index]));
            
            if(elements_obj[index].length !== undefined) {
                for(let __i = 0, __j = elements_obj[index].length; __i<__j; __i++) {
                    elements_obj[index - 1].appendChild(elements_obj[index][__i]);
                }

            } else
                elements_obj[index - 1].appendChild(elements_obj[index]);                
        }

        console.log(dom);
        container.appendChild(dom);

        function createElement(ele_str) {
            let __rep_str = ele_str.match(/\*\d+/g);
            
            if(__rep_str) {
                let __elements = [],
                    __id = ele_str.match(/#[a-zA-Z-_]*/),
                    __classes = ele_str.match(/\.[a-zA-Z-_]*/g),

                __rep = parseInt(__rep_str[0].substring(1));
                ele_str = ele_str.replace(/\*\d+/, '');

                while(__rep-- !== 0) {
                    let
                        __element = null,
                        __index = 0;
        
                    if(__id)
                        ele_str = ele_str.replace(/#[a-zA-Z-_]*/g, '');
        
                    if(__classes) {
                        ele_str = ele_str.replace(/\.[a-zA-Z-_]*/g, '');
                        __classes = Array.from(__classes);
                    }
        
                    __element = document.createElement(ele_str);
        
                    if(__classes) {
                        while(__classes[__index] !== undefined)
                            __element.classList.add(__classes[__index++].substring(1));
                    }
        
                    if(__id)
                        __element.id = __id[0].substring(1);
                    
                    __elements.push(__element);
                }

                return __elements;
            } else {
                let
                    __element = null,
                    __id = ele_str.match(/#[a-zA-Z-_]*/),
                    __classes = ele_str.match(/\.[a-zA-Z-_]*/g),
                    __index = 0;
    
                if(__id)
                    ele_str = ele_str.replace(/#[a-zA-Z-_]*/g, '');
    
                if(__classes) {
                    ele_str = ele_str.replace(/\.[a-zA-Z-_]*/g, '');
                    __classes = Array.from(__classes);
                }
    
                __element = document.createElement(ele_str);
    
                if(__classes) {
                    while(__classes[__index] !== undefined)
                        __element.classList.add(__classes[__index++].substring(1));
                }
    
                if(__id)
                    __element.id = __id[0].substring(1);
    
                return __element;
            }
        }
    }
}
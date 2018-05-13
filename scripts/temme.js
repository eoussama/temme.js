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
            __elements_str = query.split('+'),
            __index = 0;


        while(__elements_str[__index] !== undefined) {
            container.appendChild(__createElement(__elements_str[__index++]));
        }

        console.log(container);

        function __createElement(__element_str) {
            let __element_obj = document.createElement(__getElementInStr(__element_str));

            if(__getIdInStr(__element_str) !== '') __element_obj.id = __getIdInStr(__element_str);
            __setElementClasses(__element_obj, __getClassesInStr(__element_str));
            
            return __element_obj;
        }

        function __getElementInStr(__ele_str) { return __ele_str.match(/[a-zA-Z0-9-_]+/); }
        function __getIdInStr(__ele_str) { return __ele_str.match(/#[\w_-]+/) !== null ? __ele_str.match(/#[\w_-]+/)[0].substring(1) : ''; }
        function __getClassesInStr(__ele_str) { return __ele_str.match(/\.[\w_-]+/g); }
        function __setElementClasses(__target_element, __classes_arr) {
            let __cur_class = 0;

            while(__classes_arr !== null && __classes_arr[__cur_class] !== undefined)
                __target_element.classList.add(__classes_arr[__cur_class++].substring(1));
        }
    }
}
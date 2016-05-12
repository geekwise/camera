var dom_storage = document.createDocumentFragment();

var create_element = function (element_name, element_attributes) {
    var element = document.createElement(element_name);
    
    if(element_attributes.hasOwnProperty('id')){
        element.setAttribute('id',element_attributes.id);
    }
    
    if(element_attributes.hasOwnProperty('class')){
        for(i in element_attributes.class){
            if(element_attributes.class[i] !== '' || null || undefined){
                element.classList.add(element_attributes.class[i]);
            }
        }
    }
    element.classList.add('offscreen');
    
    dom_storage.appendChild(element);

}

var attach_element = function(element_id,element_parent){
         
    if(element_parent !== null){
        var child = new function(){
                if(document.getElementById(element_id)){
                    return document.getElementById(element_id);
                }else{
                    return dom_storage.getElementById(element_id);
                }            
        }

        
        if(child.classList.contains('offscreen')){
            child.classList.remove('offscreen');
            if(child.classList.length === 0){
                child.classList.add('empty');
            }
            document.body.appendChild(child);
        }
        
        else{
            
            var parent = document.getElementById(element_parent);
            if(child.classList.contains('offscreen')){
                child.classList.remove('offscreen');       
            }
            parent.appendChild(child); 
            
        };
    };
};


var get_keys = function(object){
    return Object.keys(object);
}

var get_values = function(object){
    var values = [];
    for(i in object){
        values.push(object[i]);
    }
    return values;
}


var set_value = function(element_id,element_attributes){
    
    var element = new function(){
            
                if(document.getElementById(element_id)){
                    return document.getElementById(element_id);
                }else{
                    return dom_storage.getElementById(element_id);
                }            
        
    };
    
    var element_attributes_keys = Object.keys(element_attributes);
    
    var keys = get_keys(element_attributes);
    var values = get_values(element_attributes);
    
    for(var i=0;i<keys.length;i++){
        var current_key = keys[i];
        var current_value = values[i];
    
        console.log(current_key);
        console.log(current_value);
        
        if(current_key === 'textContent'){
            element.textContent = current_value;
        }else{
            element.setAttribute(current_key,current_value);
        }
    }
    
    
}


document.addEventListener('DOMContentLoaded',function(){
    
        create_element( 'h1',{id:'title', class:['red','font-color-white','font-size-small'] } );
    
        attach_element('title');
        set_value('title',{textContent:'some data','data-id':Date.now()})
        
        create_element('input',{id:'camera_input'});    
        
        set_value('camera_input',{
                                  
            placeholder:'insert photo',
            type:'file',
            accept:'image/*;capture=camera'
        });
    
        attach_element('camera_input','title');
    

});
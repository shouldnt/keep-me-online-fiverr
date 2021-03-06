(function (interval_min, url){
    // Constants
    var CONTAINER_TOP_OFFSET = 30;
    var CONTAINER_MARGIN = 20,
        CONTAINER_PADDING = 10,
        BUTTON_CONTAINER_HEIGHT = 30;
    // Due to cross origin policy some site will not allow iframing - so we will create an iframe inside the same page.
    var body_info = {width: screen.availWidth, height: screen.availHeight }; // document.body.getBoundingClientRect();//document.getElementsByTagName("body")[0].getBoundingClientRect();
    var body_width = body_info.width - (CONTAINER_MARGIN * 2) - (CONTAINER_PADDING * 2) - 20,
        body_height = body_info.height - (CONTAINER_MARGIN * 2) - (CONTAINER_PADDING * 2) - CONTAINER_TOP_OFFSET - BUTTON_CONTAINER_HEIGHT - 20 - 50;
    console.log(body_info);
    // Toggle Status
    var toggled_full = true;
    
    var frame_container = document.createElement("div");
    var button_container = document.createElement("div");
    var cross_toggle_button =  document.createElement("button"); cross_toggle_button.appendChild(document.createTextNode("Minimize"));
    var frame = document.createElement("iframe");
    
    // Setup elements
    document.body.appendChild(frame_container);
    frame_container.appendChild(button_container);
    frame_container.appendChild(frame);
    button_container.appendChild(cross_toggle_button);
    
    function containerStateToggler(){
        if (toggled_full === true){
            prepareFrameContainerCollapsed();
            toggled_full = false;
            cross_toggle_button.innerText = "Expand";
            console.log("Collapsed");
        }else{
            prepareFrameContainerFull();
            toggled_full = true;
            cross_toggle_button.innerText = "Minimize";
            console.log("Full-ed");
        }
    }
    // Toggle controller
    cross_toggle_button.onclick = containerStateToggler;
    
    // preparing the frame container
        // set z index
        frame_container.style.zIndex = 999999;
        // position
        frame_container.style.position = "fixed";
    
        frame_container.style.opacity = 1;
        frame_container.style.margin = "20px";
        frame_container.style.padding = "15px";
        frame_container.style.overflowX = "hide";
        frame_container.style.overflowY = "hide";
        frame_container.style.border = "2px dotted red";
        frame_container.style.backgroundColor = "rgba(255, 240, 245, 1)";
    
        button_container.style.height = BUTTON_CONTAINER_HEIGHT + "px";
        button_container.style.margin = "5px";
    // prepare frame
        frame.style.width = "100%";
        frame.style.height =  (body_height - BUTTON_CONTAINER_HEIGHT) + "px"; // "100%";
    
    function prepareFrameContainerFull(){
        // position
        frame_container.style.bottom = "";
        frame_container.style.top = CONTAINER_TOP_OFFSET + "px";
        frame.style.display = "block";
        
        frame_container.style.width = body_width + "px";
        frame_container.style.height = body_height + "px";
    }
    
    function prepareFrameContainerCollapsed(){
        frame_container.style.top = "";
        frame_container.style.bottom = "20px";
        frame.style.display = "none";
        
        frame_container.style.width = "200px";
        frame_container.style.height = "100px";
    }
    
    function init(){
        frame.setAttribute("src", url);
        prepareFrameContainerFull();
        
        
        // refresh
        setInterval(function(){
            console.log("Reloading the page");
            // location.reload();
            frame.setAttribute("src", "");
            frame.setAttribute("src", url);
            console.log("Reloaded?!");
        }, interval_min * 60 * 1000);
    }
    
    init();
    
})(7 /* the interval of refeshing in minutes */,
  "https://www.fiverr.com/users/username/manage_gigs");

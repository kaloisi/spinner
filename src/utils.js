
const COLORS = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#ff7f00","#6a3d9a","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928"];


function deleteExistingScript(id) {
    let children = document.head.childNodes;
    for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        if (child.nodeName === "STYLE" && child.id === id) {
            console.log("Removing", child.id);
            document.head.removeChild(child);
        }
    }
}


module.exports = {
    getQueryParameter: (name) => {
        let search = document.location.search;
        if (search && search.length > 1) {
            if (search.charAt(0) == '?') {
                search = search.substring(1);
            }
            let split = search.split("&");
            for(let i = 0; i < split.length; i++) {
                let nv = split[i].split("=");
                if (nv && nv.length == 2 && nv[0] === name) {
                    return nv[1];
                }
            }
        }
    },


    getColor: (i, outOf) => {
        if (COLORS.length == (outOf - 1)) {
            return COLORS[i % (COLORS.length - 1)];
        } else {
            return COLORS[i % COLORS.length];
        }
    },

    addRule: (id, ...rules) => {
        deleteExistingScript(id);
        styleEl = document.createElement("style");
        styleEl.setAttribute("id", id);
        document.head.appendChild(styleEl);
        var styleSheet = styleEl.sheet;
        Object.values(rules).forEach((r,i) => {
            styleSheet.insertRule(r, i);
            //console.log(r)
        });
        //console.log(styleSheet);
    }
};
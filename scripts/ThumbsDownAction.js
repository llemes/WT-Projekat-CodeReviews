function ThumbsDownAction(element) {
    var row = element.parentNode.parentNode,
        sibling = row.nextElementSibling,
        parent = row.parentNode;

    if(sibling) {
        parent.insertBefore(sibling, row);
    }

}
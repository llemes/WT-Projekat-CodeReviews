function ThumbsUpAction(element) {
    var row = element.parentNode.parentNode,
        sibling = row.previousElementSibling,
        parent = row.parentNode;

    if(sibling.id !== 'headerTabele') {
        parent.insertBefore(row, sibling);
    }

}
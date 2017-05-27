(function() {

    let newElements = [
        'board-space',
        'star-space',
        'piece-star',
        'hud-display',
        'inventory-display'
    ]
    var gameProto = Object.create(HTMLElement.prototype);

    gameProto.createdCallback = function() { // Create a Shadow Root
        // var shadow = this.createShadowRoot();
    }
    gameProto.attachedCallback = function() {}
    gameProto.detachedCallback = function() {}
    gameProto.attributeChangedCallback = function(attrName, oldValue, newValue) {}

    Object.defineProperty(gameProto, 'attributes', {
        height: 20,
        width: 40,
        writable: true
    });

    var game = document.registerElement('game-board', {
        prototype: gameProto
    })

    newElements.forEach(function(item) {
        document.registerElement(item);
    })


    generateBoard();



})()
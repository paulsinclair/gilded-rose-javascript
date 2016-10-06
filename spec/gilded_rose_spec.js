//'use strict'

describe("Gilded Rose", function() {
    var myItem = {}

    it("should create an item with name, 'Banana' sell_in, 10, quality 40", function() {
        myItem = new Item('Banana', 10, 40)
        expect(myItem.name).toEqual('Banana')
        expect(myItem.sell_in).toEqual(10)
        expect(myItem.quality).toEqual(40)
    });

    it("Updates an banana item with deprecated sell_in and quality", function() {
        items = []
        items.push(new Item('Banana', 10, 40))
        update_quality()
        expect(items[0].name).toEqual('Banana')
        expect(items[0].sell_in).toEqual(9)
        expect(items[0].quality).toEqual(39)
        items = []
        items.push(new Item('Banana', 1, 40))
        update_quality()
        expect(items[0].name).toEqual('Banana')
        expect(items[0].sell_in).toEqual(0)
        expect(items[0].quality).toEqual(39)
    })

    it("Updates an Old Milk item with negative (including zero) sell_in to degrade in quality twice as fast", function() {
        items = []
        var negItem = new Item('Old Milk', -1, 8)
        items.push(negItem)
        update_quality()
        expect(items[0].name).toEqual('Old Milk')
        expect(items[0].sell_in).toEqual(-2)
        expect(items[0].quality).toEqual(6)

        var zeroItem = new Item('Old Milk', 0, 8)
        items.push(zeroItem)
        update_quality()
        expect(items[1].name).toEqual('Old Milk')
        expect(items[1].sell_in).toEqual(-1)
        expect(items[1].quality).toEqual(6)
    })

    it("Stops degrading quality whenever the quality gets to zero", function() {
        items = []
        var negItem = new Item('Old Milk', -1, 4)
        items.push(negItem)
        update_quality()
        expect(items[0].quality).toEqual(2)
        update_quality()
        expect(items[0].quality).toEqual(0)
        update_quality()
        expect(items[0].quality).toEqual(0)
    })

    it("The quality of an item is never increased to more than 50", function() {
        items = []
        items.push(new Item('Aged Brie', 2, 50))
        update_quality()
        expect(items[0].quality).toEqual(50)

        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 2, 50))
        update_quality()
        expect(items[1].quality).toEqual(50)
    })
    it("If the quality of an item is more than 50, it degrades by 1", function() {
        items.push(new Item('Sword', 2, 60))
        update_quality()
        expect(items[2].quality).toEqual(59)

    })

})
describe(('Aged Brie'), function() {
    it("Increases the quality of Aged Brie the older it gets", function() {
        items = []
        items.push(new Item('Aged Brie', 2, 0))
        update_quality()
        expect(items[0].sell_in).toEqual(1)
        expect(items[0].quality).toEqual(1)
    })
    it("The quality of Brie increases twice as much when the sell_in is less than zero", function() {
        items = []
        items.push(new Item('Aged Brie', 0, 0))
        update_quality()
        expect(items[0].sell_in).toEqual(-1)
        expect(items[0].quality).toEqual(2)
        update_quality()
        expect(items[0].sell_in).toEqual(-2)
        expect(items[0].quality).toEqual(4)
    })
})
describe(('Sulfuras'), function() {
    it("The sell_in and quality of Sulfuras to remain at 0 and 80 respectively at all times", function() {
        items = []
        items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
        expect(items[0].quality).toEqual(80)
        expect(items[0].sell_in).toEqual(0)
        update_quality()
        expect(items[0].quality).toEqual(80)
        expect(items[0].sell_in).toEqual(0)
    })
})
describe("The quality of a Backstage Pass", function() {
    it("Increases by one if the sell in is more than ten", function() {
        items = []
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20))
        update_quality()
        expect(items[0].sell_in).toEqual(10)
        expect(items[0].quality).toEqual(21)
    })
    it("Increases by two if the sell in is less than or equal to ten but more than five", function() {
        items = []
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 21))
        update_quality()
        expect(items[0].sell_in).toEqual(9)
        expect(items[0].quality).toEqual(23)
        items = []
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 6, 0))
        update_quality()
        expect(items[0].sell_in).toEqual(5)
        expect(items[0].quality).toEqual(2)
    })
    it("Increases by three if the sell in is less than or equal to five but isn't after the concert", function() {
        items = []
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 4, 0))
        update_quality()
        expect(items[0].sell_in).toEqual(3)
        expect(items[0].quality).toEqual(3)
        items = []
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 1, 0))
        update_quality()
        expect(items[0].sell_in).toEqual(0)
        expect(items[0].quality).toEqual(3)
    })
    it("Quality drops to zero if the concert has happened", function() {
        items = []
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20))
        update_quality()
        expect(items[0].sell_in).toEqual(-1)
        expect(items[0].quality).toEqual(0)
        items = []
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', -1, 27))
        update_quality()
        expect(items[0].sell_in).toEqual(-2)
        expect(items[0].quality).toEqual(0)
    })

})
describe(('Conjured Items'), function() {
    xit("Quality decreases twice as fast as normal items", function() {
        items = []
        items.push(new Item('Conjured Sword', 10, 20))
        update_quality()
        expect(items[0].quality).toEqual(18)
    })
})

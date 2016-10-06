function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function sulfuras_update(i) {
    items[i].quality = 80
    items[i].sell_in = 0
}



function update_quality() {
    for (var i = 0; i < items.length; i++) {

        if (items[i].name === 'Aged Brie') {
            if (items[i].quality < 50) {
                items[i].quality++
            }
            if (items[i].quality < 50 && items[i].sell_in < 1) {
                items[i].quality++
            }

            items[i].sell_in--
                continue
        }
        if (items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {

            if (items[i].sell_in > 10) {
                items[i].quality++
            }
            if (items[i].sell_in < 11 && items[i].sell_in > 5) {
                items[i].quality++
                    items[i].quality++
            }
            if (items[i].sell_in < 6 && items[i].sell_in > -1) {
                items[i].quality = items[i].quality + 3
                if (items[i].quality > 50) {
                    items[i].quality = 50
                }
            }

            if (items[i].sell_in < 1) {
                items[i].quality = 0
            }
            items[i].sell_in--
                continue
        }

        if (items[i].name === 'Sulfuras, Hand of Ragnaros') {
            sulfuras_update(i)
            continue
        }

        if (items[i].name.length > 0) {
            if (items[i].sell_in < 1) {
                items[i].quality--
            }
            items[i].quality--
                items[i].sell_in--
                if (items[i].quality < 0) {
                    items[i].quality = 0
                }
            continue
        }


    }
}

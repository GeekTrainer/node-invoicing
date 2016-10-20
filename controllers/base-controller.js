var BaseController = function (Item) {
    var self = this;

    self.getOne = (req, res) => {
        Item.findById(req.params.id).exec((err, item) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.json(item);
            }
        });
    };

    self.post = (req, res) => {
        var item = new Item(req.body.item);
        item.save((err) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.json(item);
            }
        });
    };

    self.put = (req, res) => {
        Item.findOneAndUpdate({ _id: req.params.id },
            JSON.parse(req.body.item),
            { new: true })
            .exec((err, item) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    res.json(item);
                }
            });
    };

    self.delete = (req, res) => {
        Item.remove({ _id: req.params.id }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(202).end();
            }
        });
    };
}

module.exports = BaseController;
const db = require('./pool').getPool()

//---------------------SHOPPING LIST---------------------
// POST item to shoppinglist

const postToShoppingList = (req, res) => {
    let result;
    const itemDetails = req.body;
    if (itemDetails.listID && itemDetails.itemID && itemDetails.itemCount) {
        db.query(
            "SELECT link_id FROM tbl_shoppinglist_items WHERE item_id = $1 AND list_id = $2",
            [itemDetails.itemID, itemDetails.listID],
            (db_err, db_res) => {
                if (db_err) {
                    throw db_err;
                }
                let qryResult = db_res.rows;
                console.log(qryResult);
                if (qryResult.length == 0) {
                    db.query(
                        "INSERT INTO tbl_shoppinglist_items (list_id, item_id, item_count) VALUES ($1, $2, $3)",
                        [
                            itemDetails.listID,
                            itemDetails.itemID,
                            itemDetails.itemCount,
                        ],
                        (db_err, db_res) => {
                            if (db_err) {
                                throw db_err;
                            }
                        }
                    );
                } else {
                    db.query(
                        "UPDATE tbl_shoppinglist_items SET item_count = item_count + 1 WHERE link_id = $1",
                        [qryResult[0].link_id],
                        (db_err, db_res) => {
                            if (db_err) {
                                throw db_err;
                            }
                        }
                    );
                }
                result = {
                    status: "success",
                    message:
                        "The item was successfully added to the shoppinglist",
                };
                res.json(result);
            }
        );
    } else {
        result = {
            status: "failed",
            message: "The item was not added to the shoppinglist",
        };
        res.status(400);
        res.json(result);
    }
}

//FOR TESTING: GET item from shopping list
const getShoppingList = (req, res) => {
    db.query(
        "SELECT link_id, item_name, category_name, item_count FROM tbl_shoppinglist_items INNER JOIN tbl_items ON tbl_items.item_id = tbl_shoppinglist_items.item_id INNER JOIN tbl_item_categories ON tbl_item_categories.category_id = tbl_items.category_id WHERE list_id = $1",
        [req.params.listId],
        (db_err, db_res) => {
            if (db_err) {
                throw db_err;
            }
            res.status(200).json(db_res.rows);
        }
    )
}

module.exports = {
                  postToShoppingList,
                  getShoppingList
                 }
<?php

/**
 * Messages:
 * 
 * message_id     The ID of the message
 * message_type   The type of the message (0 for command, 1 for normal)
 * message_body   The body of the message
 * message_time   The time the message was sent
 * sender_id      The ID of the sender
 * sender_name    The name of the sender
 * sender_colour  The colour we should display the sender as
 */

class Messages
{
    protected $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function singleById($id_message)
    {
        $query = $this->db->prepare("SELECT * FROM messages WHERE id_message = ?");
        $query->bindValue(1, $id_message, PDO::PARAM_INT);
        $query->execute(); // [] 

        return $query->fetch(PDO::FETCH_CLASS);
    }

    public function getNewest($amount = 20)
    {
        $query = $this->db->prepare("SELECT * FROM messages ORDER BY message_time DESC LIMIT ?");
        $query->bindValue(1, $amount, PDO::PARAM_INT);
        $query->execute();

        return $query->fetch(PDO::FETCH_CLASS);
    }

    /**
     * Creates/inserts a new message record into the database.
     *
     * @param   int     $message_type   The type of the message (0/1).
     * @param   string  $message_body   The body of the message (the message itself)
     * @param   int     $sender_id      The ID of the sender
     * @param   string  $sender_name    The name of the sender
     * @param   string  $sender_colour  The colour we should display the sender as later on
     *
     * @return  null
     */
    public function create($message_type, $message_body, $sender_id, $sender_name, $sender_colour)
    {
        $sender_name = htmlentities($sender_name, ENT_QUOTES, 'UTF-8');
        $message_body = htmlentities($message_body, ENT_QUOTES, 'UTF-8');

        $message_time = date('Y.m.d H:i:s');

        $query = $this->db->prepare("INSERT INTO messages
                                     VALUES (NULL, :message_type, :message_body, :message_time, :sender_id, :sender_name, :sender_colour)"
                                   );
        $query->bindValue('message_body', $message_body, PDO::PARAM_STR);
        $query->bindValue('message_time', $message_time, PDO::PARAM_STR);
        $query->bindValue('sender_id', $sender_id, PDO::PARAM_INT);
        $query->bindValue('sender_name', $sender_name, PDO::PARAM_STR);
        $query->bindValue('sender_colour', $sender_colour, PDO::PARAM_STR);

        $query->execute();
    }
}
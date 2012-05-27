<?php
class Mention extends CI_Model{
	
    const UNCHECKED = 'unchecked';
    
	private $table_name = 'cidi_mention';
	
	
	function Mention(){
		$this->load->database();
	}
	
	function add($data){
		
		$this->db->insert($this->table_name,$data);
	
	}
	
	function unread($userid){
		$query = $query = $this->db->where(array(
			'to_user_id'=>$userid,
			'status' => self::UNCHECKED
		))->get($this->table_name);
		
		return $query->result();
	}
	
	function count($userid){
		$query = $this->db->where(array(
			'to_user_id'=>$userid,
			'status' => self::UNCHECKED
		))->get($this->table_name);
		
		return $query->num_rows();
	}
}

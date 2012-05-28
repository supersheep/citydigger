<?php
class Mention extends CI_Model{
	
    const UNREAD = 'unread';
    const READ = 'read';
	private $table_name = 'cidi_mention';
	
	
	function Mention(){
		$this->load->database();
	}
	
	function add($data){
		
		$this->db->insert($this->table_name,$data);
	
	}
	
	function unreads($userid){
		$query = $this->db->where(array(
			'to_user_id'=>$userid,
			'status' => self::UNREAD
		))->get($this->table_name);
		
		return $query->result();
	}
	
	function read($id){
		$this->db->where(array(
			'id'=>$id
		))->update($this->table_name,array(
			'status'=>self::READ	
		));
		if($this->db->affected_rows()){
			return true;
		}else{
			return false;
		}
	}
	
	function count($userid){
		$query = $this->db->where(array(
			'to_user_id'=>$userid,
			'status' => self::UNREAD
		))->get($this->table_name);
		
		return $query->num_rows();
	}
}

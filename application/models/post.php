<?php
class Post extends CI_Model{
	
	private $table_name = 'cidi_post';
	
	function Post(){
		$this->load->database();
	}
	
	function add($data){
		
		$query = $this->db->order_by('id','desc')->where(array(
			'userid' => $data['userid']
		))->get($this->table_name);
		
		$row = $query->row();
		if($row && $row->content === $data['content']){
			return 'duplicating';
		}else if(!$data['content']){
			return 'emptycontent';
		}else{
			$this->db->insert($this->table_name,$data);
			return 'success';
		}
	}
	
	function latest($num){
		$query = $this->db->order_by('id','desc')->get($this->table_name,$num);
		return $query->result();
	}
	
	function getById($id){
		$query = $this->db->where(array('id'=>$id))->get($this->table_name);
		$result = $query->result();
		
		if(count($result)){
			return $result[0];
		}else{
			return NULL;
		}
	}
}

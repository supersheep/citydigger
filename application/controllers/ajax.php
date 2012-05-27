<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {

	public function user($type){	
		parse_str($_SERVER['QUERY_STRING'],$_GET);
		
		if($type == "fresh"){
			$this->freshUser($this->input->get('from'),$this->input->get('to'));
		}else if($type == "search"){
			$this->searchUser($this->input->get('keyword'),$this->input->get('from'),$this->input->get('to'));
		}
	}
	
	public function post($type){
		parse_str($_SERVER['QUERY_STRING'],$_GET);
		
		if($type == "add"){
			$this->addpost();
		}else if($type == "get"){
			$this->getpost();
		}else if($type == "latest"){
			$this->latestpost();
		}else{
			$this->errorMsg('no such type');
		}
	}
	
	public function mentions($type){
	
		parse_str($_SERVER['QUERY_STRING'],$_GET);
		
		if($type == "unread"){
			$this->unreadMentions();
		}else if($type == "check"){
			//$this->check
		}
	}
	
	
	private function unreadMentions(){
		
		$this->load->model('mention');
		$this->load->model('post');
		$this->load->model('user');
		
		$mentions = $this->mention->unread($this->user->current()->id);
		$ret = array();
		// maybe need to specify the context_type one day;
		foreach($mentions as $mention){
			$post = $this->post->getById($mention->context_id);
			$ret[] = array(
				'user' => $this->user->getById($post->userid),
				'post' => $mention->context_id 
			);
		}
		
		// {username,avatar,postid}
		$this->success($ret);
	}
	
	/*
	public function relation($type){
		
		
	}
	*/
	
	
	
	private function errorMsg($msg){
	
		echo json_encode(array(
			'code'=>500,
			'msg'=>$msg
		));
	}
	
	private function success($result){
		echo json_encode(array(
			'code'=>200,
			'msg'=>$result
		));
	}
	
	private function latestpost(){
		$this->load->model('post');
		$this->load->model('user');
		$num = $this->input->get('num')?$this->input->get('num'):5;
		$ret = array();
		
		$posts = $this->post->latest($num);
		foreach($posts as $post){
			$ret[] = array(
				'user' => $this->user->getById($post->userid),
				'post' => $post
			);
		}
		
		$this->success($ret);
	}
	
	private function getpost(){
		$this->load->model('post');
		$this->load->model('user');
		$id = $this->input->get('id');
		$post = $this->post->getById($id);
		$user = $this->user->getById($post->userid);
		$this->success(array(
			'user' => $user,
			'post' => $post
		));
		
	}
	
	private function addpost(){
		if($this->input->post()!==false){
			// through this we'll have latlng,content,mentions and userid
			extract($this->input->post());
			$this->load->model('user');
			$this->load->model('post');
			$this->load->model('mention');
		
			$result = $this->post->add(array(
				'latlng'=>$latlng,
				'content'=>$content,
				'mentions'=>$mentions?$mentions:'',
				'userid'=>$userid
			));
			
			if($result === 'success'){
				if($mentions){
					$post_id = $this->db->insert_id();
				
					$toes = explode(',',$mentions);
					
					foreach($toes as $to){
						$this->mention->add(array(
							'context_type' => 'post',
							'context_id' => $post_id,
							'to_user_id'=>$to
						));
					}
				}
				$this->success(array(
					'user'=>$this->user->getById($userid),
					'latlng'=>$latlng
				));		
					
			}else{
				$this->errorMsg($result);
			}
		}else{
			$this->errorMsg('arguments not match');
		}
		
	}
	
	
	private function searchUser($keyword,$from,$to){
		$this->load->model('user');
		if($keyword!==false && $from!==false && $to!==false){
			$result = $this->user->search($keyword,$from,$to);
			$this->success($result);
		}else{
			$this->errorMsg("bad args");
		}
	}
	
	private function freshUser($from,$to){
		$this->load->model('user');
		if($from!==false && $to!==false){
			$result = $this->user->latest($from,$to);
			$this->success($result);
		}else{
			$this->errorMsg("bad args");
		}
		
	}
	
}
	
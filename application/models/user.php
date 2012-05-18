<?php
class User extends CI_Model{
	
	private $table_name = 'cidi_user';
	private $session_table = 'cidi_session';
	private $cookie_email = 'email';
	private $cookie_name = 'cidiu'; 
	
	function create($data){
		
		$data['password'] = md5($data['password']);
		
		
		$this->db->insert($this->table_name,$data);
	}
	
	function logged(){
		$this->load->database();
		$this->load->library('user_agent');
		$session = $this->input->cookie($this->cookie_name);
		$email = $this->input->cookie($this->cookie_email);
		$ua = $this->agent->browser().' '.$this->agent->version();
		$ip = $this->input->ip_address();
		$encrypt = $this->config->item('session_encrypt_code');
		$query = $this->db->select()->from($this->session_table)->where('email',$email)->get();
		
		if($row = $query->row()){
			
			$s = md5($email.$ua.$ip.$encrypt);
			
			if($s == $session){
				return true;
			}else{
				$this->db->where('email',$email);
				$this->db->delete($this->session_table);
				return false;
			}
			
		}else{
			return false;
			
		}
		
	}
	
	function current(){
		$ua = $this->input->cookie($this->cookie_email);
		if(!$ua){
			return false;
		}else{
			$this->load->database();
			$query = $this->db->select()->from($this->table_name)->where('email',$ua)->get();
			return $query->row();
		}
	}
	
	// return status
	// 0: failed
	// 1: succeeded
	// 2: info imcomplete
	function login($email,$password){
		$this->load->library('user_agent');
		$this->load->library('session');
		$this->load->database();
		
		$query = $this->db->select()->from($this->table_name)
			->where('email',$email)->where('password',md5($password))->get();
			
		// 用户存在		
		if($query->num_rows()>0){
			// write session and cookie 
			$ua = $this->agent->browser().' '.$this->agent->version();
			$ip =  $this->input->ip_address();
			$encrypt = $this->config->item('session_encrypt_code');
			$session = md5($email.$ua.$ip.$encrypt);
			
			$session_query = $this->db->select()->from($this->session_table)->where('session',$session)->get();
			
			// session不存在则存之
			if($session_query->num_rows == 0){
				
				$this->db->insert($this->session_table,array(
					'email' => $email,
					'session'=> $session,
					'ua' => $ua,
					'ip' => $ip
				));
				// save cookie of session to local
				$expire = time()+60*60*24*30;
				$this->input->set_cookie($this->cookie_name,$session,$expire);
				$this->input->set_cookie($this->cookie_email,$email,$expire);
			}
			
			// 返回成功
			return true;
		}else{
			// 返回失败
			return 0;
		}
	}
	
	
	function name_exists($username){
		$query = $this->db
			->select('id')
			->from($this->table_name)
			->where('username',$username)
			->get();
		return $query->num_rows()>0;
	}

	
	function email_exists($email){
		$query = $this->db
			->select('id')
			->from($this->table_name)
			->where('email',$email)
			->get();
		return $query->num_rows()>0;
	}
}
